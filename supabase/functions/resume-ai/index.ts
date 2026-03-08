import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const { type, data } = await req.json();

    let systemPrompt = "";
    let userPrompt = "";
    const tools: any[] = [];
    let tool_choice: any = undefined;

    switch (type) {
      case "improve_bullet": {
        systemPrompt = "You are an expert resume writer. Improve bullet points to be more impactful using strong action verbs, quantifiable results, and concise professional language. Keep each bullet to 1-2 lines.";
        userPrompt = `Improve this resume bullet point for a ${data.jobTitle || "professional"} role at ${data.company || "a company"}:\n\n"${data.bullet}"`;
        tools.push({
          type: "function",
          function: {
            name: "improved_bullet",
            description: "Return the improved bullet point",
            parameters: {
              type: "object",
              properties: { bullet: { type: "string", description: "The improved bullet point text" } },
              required: ["bullet"],
              additionalProperties: false
            }
          }
        });
        tool_choice = { type: "function", function: { name: "improved_bullet" } };
        break;
      }

      case "generate_summary": {
        systemPrompt = "You are an expert resume writer. Write a compelling professional summary (2-3 sentences) based on the candidate's experience and skills.";
        const expList = (data.experience || []).map((e: any) => `${e.jobTitle} at ${e.company}`).join(", ");
        const skillList = (data.skills || []).map((s: any) => s.name).filter(Boolean).join(", ");
        userPrompt = `Write a professional summary for someone with this background:\nExperience: ${expList || "Not specified"}\nSkills: ${skillList || "Not specified"}\nName: ${data.name || "the candidate"}`;
        tools.push({
          type: "function",
          function: {
            name: "generated_summary",
            description: "Return the generated professional summary",
            parameters: {
              type: "object",
              properties: { summary: { type: "string", description: "The professional summary text" } },
              required: ["summary"],
              additionalProperties: false
            }
          }
        });
        tool_choice = { type: "function", function: { name: "generated_summary" } };
        break;
      }

      case "suggest_skills": {
        systemPrompt = "You are a career advisor. Suggest relevant skills based on job titles and industry.";
        const roles = (data.experience || []).map((e: any) => e.jobTitle).filter(Boolean).join(", ");
        userPrompt = `Suggest 8-12 relevant skills for someone with these roles: ${roles || "general professional"}. Include a mix of technical and soft skills.`;
        tools.push({
          type: "function",
          function: {
            name: "suggested_skills",
            description: "Return suggested skills",
            parameters: {
              type: "object",
              properties: {
                skills: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      level: { type: "string", enum: ["beginner", "intermediate", "expert"] },
                      category: { type: "string", enum: ["technical", "soft", "language"] }
                    },
                    required: ["name", "level", "category"],
                    additionalProperties: false
                  }
                }
              },
              required: ["skills"],
              additionalProperties: false
            }
          }
        });
        tool_choice = { type: "function", function: { name: "suggested_skills" } };
        break;
      }

      case "ats_score": {
        systemPrompt = "You are an ATS (Applicant Tracking System) expert. Analyze resumes for ATS compatibility and provide actionable feedback.";
        userPrompt = `Analyze this resume for ATS compatibility:\n\nName: ${data.personalInfo?.fullName || "N/A"}\nSummary: ${data.summary || "None"}\nExperience: ${JSON.stringify(data.experience || [])}\nEducation: ${JSON.stringify(data.education || [])}\nSkills: ${(data.skills || []).map((s: any) => s.name).filter(Boolean).join(", ") || "None"}${data.jobDescription ? `\n\nTarget Job Description:\n${data.jobDescription}` : ""}`;
        tools.push({
          type: "function",
          function: {
            name: "ats_analysis",
            description: "Return the ATS analysis",
            parameters: {
              type: "object",
              properties: {
                score: { type: "number", description: "ATS compatibility score from 0-100" },
                strengths: { type: "array", items: { type: "string" }, description: "List of strengths" },
                improvements: { type: "array", items: { type: "string" }, description: "List of specific improvements" },
                missingKeywords: { type: "array", items: { type: "string" }, description: "Missing keywords if job description provided" }
              },
              required: ["score", "strengths", "improvements", "missingKeywords"],
              additionalProperties: false
            }
          }
        });
        tool_choice = { type: "function", function: { name: "ats_analysis" } };
        break;
      }

      default:
        return new Response(JSON.stringify({ error: "Unknown type" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    const body: any = {
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      tools,
      tool_choice,
    };

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits in your workspace settings." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = await response.json();
    const toolCall = result.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall) {
      return new Response(JSON.stringify({ error: "No response from AI" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const parsed = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify({ result: parsed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("resume-ai error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
