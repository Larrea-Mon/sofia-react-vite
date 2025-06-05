GitHub Copilot
Understood! Your current setup allows any login in frontend/mock mode because it skips credential checks when config.isBackend is false. When you add a backend and set config.isBackend = true, the login will validate credentials against your backend API.

When you're ready to add backend integration, you can:

- Set config.isBackend = true
- Ensure your backend API is running and accessible
- The login form will then POST credentials to /auth/signin/local and only succeed with valid credentials
If you need help wiring up the backend or want to add temporary frontend credential checks for demo/dev, just let me know!



localStorage.removeItem('token');
localStorage.removeItem('user');
window.location.reload();

