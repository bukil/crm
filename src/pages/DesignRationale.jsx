import { Box, Typography, Paper, Divider, Container } from '@mui/material';

const Section = ({ title, children }) => (
    <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
            {title}
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary', textAlign: 'justify' }}>
            {children}
        </Typography>
    </Box>
);

const DesignRationale = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{ mb: 8, mt: 2 }}>
                <Typography variant="h3" fontWeight="700" gutterBottom>
                    Design Rationale
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    Sales Enablement & Content Sharing Feature
                </Typography>
                <Divider sx={{ my: 3 }} />

                <Section title="Why this flow?">
                    The user flow is designed purely around <b>velocity</b>. Sales representatives are often pressed for time and need immediate access to collateral.
                    We centered the experience on a "Command Center" Dashboard that surfaces the most critical actions—uploading assets and finding recent files—immediately upon login.
                    By placing "Monthly Focus" and "Quick Actions" side-by-side with recent activity, we reduce the time-to-value from seconds to milliseconds.
                    The flow strictly separates <i>Consumption</i> (Dashboard) from <i>Management</i> (Library), allowing users to switch contexts without losing focus.
                </Section>

                <Section title="How did you simplify UX given SuperAGI’s platform context?">
                    SuperAGI represents intelligence and automation. A cluttered interface contradicts that promise.
                    We simplified the UX by:
                    1. <b>Removing Cognitive Load</b>: Instead of a dense spreadsheet view on the home page, we use high-contrast, square statistic widgets that provide "at-a-glance" health metrics.
                    2. <b>Predictive Layouts</b>: The "Monthly Focus" card assumes the user's intent (pushing specific Q4 decks) and prevents them from having to search for it.
                    3. <b>Visual Hierarchy</b>: We used strict grid alignments and premium spacing (Material UI spacing of 3) to create a sense of order and calm, essential for a complex AI platform.
                </Section>



                <Section title="How did you design permissions? Why view/download? Why external link vs internal?">
                    <b>Permissions Strategy:</b> We adopted a "Least Privilege" defaults approach. By default, links are "View Only". This protects sensitive IP while allowing rapid sharing.
                    <br /><br />
                    <b>View vs. Download:</b> "View Only" allows prospects to engage with content without retaining a copy, crucial for version control and revocation (e.g., if a file expires). "Download" is reserved for high-trust interactions.
                    <br /><br />
                    <b>External vs. Internal Links:</b>
                    <ul>
                        <li><b>External Public Links</b> were chosen to remove friction for the <i>recipient</i>. A prospect should not need to log in to SuperAGI to view a sales deck. This reduces the "barrier to entry" for the sale.</li>
                        <li><b>Internal Links</b> are implicit; the Content Library itself acts as the internal repository for the team.</li>
                    </ul>
                </Section>

                <Section title="How did you ensure the experience aligns with SuperAGI’s intelligent platform ethos?">
                    <b>"Intelligence" in UI</b> is demonstrated through <i>context awareness</i>.
                    The application handles state intelligently—showing "Expired" badges automatically based on date logic, and disabling actions on invalid files.
                    Visually, we moved away from standard "Admin Panel" tropes (blue/white tables) to a darker, sleeker, high-contrast aesthetic with custom square widgets.
                    This "Dark Mode" inspired palette and the use of glass-morphic elements (subtle transparencies in list items) convey a futuristic, premium tool feeling that aligns with an AGI-focused brand.
                </Section>
            </Box>
        </Container>
    );
};

export default DesignRationale;
