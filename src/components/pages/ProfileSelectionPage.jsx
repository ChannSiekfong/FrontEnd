// src/pages/ProfileSelectionPage.jsx
import PageShell from '../components/layout/PageShell';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/ui/Footer';
import { ProfileCard, CreateProfileCard, PROFILES } from '../components/sections/ProfileSections';

export default function ProfileSelectionPage() {
  return (
    <PageShell topBar="Profile Selection">
      <Navbar />
      <div style={{ flex: 1, padding: '60px 48px 20px', overflowY: 'auto' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ borderTop: '1px solid var(--border-dim)', marginBottom: 48 }} />
          <div className="animate-fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {PROFILES.map((p, i) => (
              <div key={p.id} className={`animate-fade-up-delay-${i}`}>
                <ProfileCard profile={p} />
              </div>
            ))}
            <div className="animate-fade-up-delay-2">
              <CreateProfileCard />
            </div>
          </div>
        </div>
      </div>
      <Footer variant="profile" />
    </PageShell>
  );
}
