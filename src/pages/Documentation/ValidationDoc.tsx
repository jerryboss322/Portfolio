
// Documentation for Validation
import { useState, useMemo } from 'react';
const tabs = [{ id: 'overview', name: 'Overview' }, { id: 'usage', name: 'Usage' }, { id: 'props', name: 'Props' }, { id: 'examples', name: 'Examples' }, { id: 'api', name: 'API' }, { id: 'accessibility', name: 'Accessibility' }, { id: 'theming', name: 'Theming' }, { id: 'performance', name: 'Performance' }];
export function ValidationDocPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const memoTabs = useMemo(() => tabs, []);
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <header>
        <h1>Documentation: Validation</h1>
        <p>Complete documentation for the Validation component with props, examples, and best practices.</p>
      </header>
      <nav>
        {memoTabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '0.5rem 1rem', margin: '0.25rem', borderRadius: '6px', border: '1px solid #E2E8F0', background: activeTab === tab.id ? '#2563EB' : 'transparent', color: activeTab === tab.id ? 'white' : '#0F172A', cursor: 'pointer' }}>
            {tab.name}
          </button>
        ))}
      </nav>
      {activeTab === 'overview' && (
        <section><h2>Overview</h2><p>The Validation component is a versatile building block.</p><ul><li>Fully accessible</li><li>Customizable via props</li><li>Supports keyboard navigation</li><li>Responsive by default</li><li>Dark mode compatible</li><li>SSR compatible</li></ul></section>
      )}
      {activeTab === 'usage' && (
        <section><h2>Usage</h2><pre style={{ background: '#1E293B', padding: '1rem', borderRadius: '8px' }}><code>{/* import { Validation } from './components'; */}</code></pre></section>
      )}
      {activeTab === 'props' && (
        <section><h2>Props</h2><table><thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody>
          <tr><td>children</td><td>ReactNode</td><td>None</td><td>Content</td></tr>
          <tr><td>className</td><td>string</td><td></td><td>Custom class</td></tr>
          <tr><td>style</td><td>CSSProperties</td><td>{}</td><td>Inline styles</td></tr>
          <tr><td>onClick</td><td>() =&gt; void</td><td>None</td><td>Handler</td></tr>
          <tr><td>disabled</td><td>boolean</td><td>false</td><td>Disabled</td></tr>
          <tr><td>loading</td><td>boolean</td><td>false</td><td>Loading</td></tr>
          <tr><td>variant</td><td>string</td><td>primary</td><td>Variant</td></tr>
          <tr><td>size</td><td>string</td><td>md</td><td>Size</td></tr>
          <tr><td>id</td><td>string</td><td>None</td><td>HTML id</td></tr>
          <tr><td>aria-label</td><td>string</td><td>None</td><td>ARIA label</td></tr>
          <tr><td>tabIndex</td><td>number</td><td>0</td><td>Tab index</td></tr>
        </tbody></table></section>
      )}
      {activeTab === 'examples' && (
        <section><h2>Examples</h2>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} style={{ background: '#1E293B', padding: '1rem', borderRadius: '8px', marginBottom: '0.5rem' }}>
              <h3>Example {i + 1}</h3>
              <pre><code>{'const example' + (i + 1) + ' = () => <' + 'Validation variant="primary" size="md" />;'}</code></pre>
            </div>
          ))}
        </section>
      )}
      {activeTab === 'api' && (
        <section><h2>API Reference</h2><ul><li><code>render()</code> - Renders component</li><li><code>focus()</code> - Focuses element</li><li><code>blur()</code> - Removes focus</li><li><code>validate()</code> - Validates input</li><li><code>reset()</code> - Resets state</li><li><code>destroy()</code> - Cleans up</li></ul></section>
      )}
      {activeTab === 'accessibility' && (
        <section><h2>Accessibility</h2><ul><li>Keyboard navigable</li><li>ARIA attributes supported</li><li>Screen reader compatible</li><li>Color contrast compliant</li><li>Motion reduction respected</li></ul></section>
      )}
      {activeTab === 'theming' && (
        <section><h2>Theming</h2><ul><li><code>--color-primary</code></li><li><code>--color-secondary</code></li><li><code>--color-background</code></li><li><code>--color-surface</code></li><li><code>--color-border</code></li><li><code>--color-text</code></li></ul></section>
      )}
      {activeTab === 'performance' && (
        <section><h2>Performance</h2><ul><li>Memoized with React.memo</li><li>Uses useCallback</li><li>Minimizes re-renders</li><li>Lazy loading supported</li><li>Bundle optimized</li></ul></section>
      )}
    </div>
  );
}
export default ValidationDocPage;
