import { useResumeStore, type SectionStyle, type ResumeStyles } from '@/store/resumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const fontOptions = [
  'Plus Jakarta Sans',
  'Inter',
  'Georgia',
  'Times New Roman',
  'Arial',
  'Helvetica',
  'Roboto',
  'Lato',
  'Open Sans',
  'Merriweather',
  'Playfair Display',
  'JetBrains Mono',
  'Fira Code',
  'Source Sans Pro',
];

const weightOptions = [
  { value: '300', label: 'Light' },
  { value: '400', label: 'Regular' },
  { value: '500', label: 'Medium' },
  { value: '600', label: 'Semi Bold' },
  { value: '700', label: 'Bold' },
  { value: '800', label: 'Extra Bold' },
];

interface SectionStyleEditorProps {
  label: string;
  sectionKey: 'name' | 'headings' | 'body' | 'contact';
  style: SectionStyle;
}

const SectionStyleEditor = ({ label, sectionKey, style }: SectionStyleEditorProps) => {
  const { updateSectionStyle } = useResumeStore();

  return (
    <div className="space-y-3 p-3 rounded-lg border border-border bg-background">
      <h4 className="text-sm font-semibold text-foreground">{label}</h4>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs">Font Family</Label>
          <select
            className="w-full h-9 rounded-md border border-input bg-background px-2 text-sm"
            value={style.fontFamily}
            onChange={(e) => updateSectionStyle(sectionKey, { fontFamily: e.target.value })}
          >
            {fontOptions.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <Label className="text-xs">Font Weight</Label>
          <select
            className="w-full h-9 rounded-md border border-input bg-background px-2 text-sm"
            value={style.fontWeight}
            onChange={(e) => updateSectionStyle(sectionKey, { fontWeight: e.target.value })}
          >
            {weightOptions.map(w => <option key={w.value} value={w.value}>{w.label}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs">Size ({style.fontSize}px)</Label>
          <Slider
            min={8} max={36} step={1}
            value={[style.fontSize]}
            onValueChange={([v]) => updateSectionStyle(sectionKey, { fontSize: v })}
          />
        </div>
        <div>
          <Label className="text-xs">Color</Label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={style.color}
              onChange={(e) => updateSectionStyle(sectionKey, { color: e.target.value })}
              className="w-8 h-8 rounded border border-input cursor-pointer"
            />
            <Input
              value={style.color}
              onChange={(e) => updateSectionStyle(sectionKey, { color: e.target.value })}
              className="flex-1 h-8 text-xs"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs">Line Height ({style.lineHeight})</Label>
          <Slider
            min={1} max={2.5} step={0.1}
            value={[style.lineHeight]}
            onValueChange={([v]) => updateSectionStyle(sectionKey, { lineHeight: v })}
          />
        </div>
        <div>
          <Label className="text-xs">Letter Spacing ({style.letterSpacing}px)</Label>
          <Slider
            min={-1} max={5} step={0.5}
            value={[style.letterSpacing]}
            onValueChange={([v]) => updateSectionStyle(sectionKey, { letterSpacing: v })}
          />
        </div>
      </div>
    </div>
  );
};

const StylePanel = () => {
  const { data } = useResumeStore();
  const { styles } = data;
  const store = useResumeStore();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground font-sans">Resume Styling</h3>

      {/* Global Colors */}
      <div className="space-y-3 p-3 rounded-lg border border-border bg-background">
        <h4 className="text-sm font-semibold text-foreground">Global Colors</h4>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label className="text-xs">Accent</Label>
            <div className="flex gap-1 items-center">
              <input type="color" value={styles.accentColor} onChange={(e) => store.updateStyles({ accentColor: e.target.value })} className="w-8 h-8 rounded border border-input cursor-pointer" />
              <Input value={styles.accentColor} onChange={(e) => store.updateStyles({ accentColor: e.target.value })} className="flex-1 h-8 text-xs" />
            </div>
          </div>
          <div>
            <Label className="text-xs">Background</Label>
            <div className="flex gap-1 items-center">
              <input type="color" value={styles.backgroundColor} onChange={(e) => store.updateStyles({ backgroundColor: e.target.value })} className="w-8 h-8 rounded border border-input cursor-pointer" />
              <Input value={styles.backgroundColor} onChange={(e) => store.updateStyles({ backgroundColor: e.target.value })} className="flex-1 h-8 text-xs" />
            </div>
          </div>
          <div>
            <Label className="text-xs">Header BG</Label>
            <div className="flex gap-1 items-center">
              <input type="color" value={styles.headerBgColor} onChange={(e) => store.updateStyles({ headerBgColor: e.target.value })} className="w-8 h-8 rounded border border-input cursor-pointer" />
              <Input value={styles.headerBgColor} onChange={(e) => store.updateStyles({ headerBgColor: e.target.value })} className="flex-1 h-8 text-xs" />
            </div>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="space-y-3 p-3 rounded-lg border border-border bg-background">
        <h4 className="text-sm font-semibold text-foreground">Layout</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Page Margin ({styles.pageMargin}px)</Label>
            <Slider min={16} max={64} step={4} value={[styles.pageMargin]} onValueChange={([v]) => store.updateStyles({ pageMargin: v })} />
          </div>
          <div>
            <Label className="text-xs">Section Spacing ({styles.sectionSpacing}px)</Label>
            <Slider min={8} max={40} step={4} value={[styles.sectionSpacing]} onValueChange={([v]) => store.updateStyles({ sectionSpacing: v })} />
          </div>
        </div>
      </div>

      {/* Section Visibility */}
      <div className="space-y-3 p-3 rounded-lg border border-border bg-background">
        <h4 className="text-sm font-semibold text-foreground">Section Visibility</h4>
        <div className="grid grid-cols-2 gap-3">
          {(Object.keys(styles.sectionVisibility) as Array<keyof typeof styles.sectionVisibility>).map((section) => (
            <div key={section} className="flex items-center justify-between">
              <Label className="text-xs capitalize">{section}</Label>
              <Switch
                checked={styles.sectionVisibility[section]}
                onCheckedChange={(checked) => store.updateSectionVisibility(section, checked)}
              />
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Per-section typography */}
      <SectionStyleEditor label="Name / Title" sectionKey="name" style={styles.name} />
      <SectionStyleEditor label="Section Headings" sectionKey="headings" style={styles.headings} />
      <SectionStyleEditor label="Body Text" sectionKey="body" style={styles.body} />
      <SectionStyleEditor label="Contact Info" sectionKey="contact" style={styles.contact} />
    </div>
  );
};

export default StylePanel;
