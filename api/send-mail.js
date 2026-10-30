export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { userEmail, userName, answerText } = req.body;

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'WINDS Development <onboarding@resend.dev>',
                to: [userEmail],
                subject: 'Response to your Support Ticket | WINDS-DEV',
                html: `
                    <div style="font-family: Arial, sans-serif; color: #222222; padding: 20px; line-height: 1.6;">
                        <p>Hello Dear,</p>
                        <p><strong>${userName}</strong></p>
                        <div style="margin: 20px 0; font-size: 1rem; color: #333333;">
                            ${answerText}
                        </div>
                        <div style="margin-top: 30px;">
                            <a href="https://dc.gg/winds.dev" target="_blank" style="background-color: #e63946; color: #ffffff; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block;">
                                MEET US
                            </a>
                        </div>
                    </div>
                `
            })
        });

        const data = await response.json();
        if (response.ok) {
            return res.status(200).json({ success: true, data });
        } else {
            return res.status(400).json({ error: data });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
