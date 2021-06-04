# Test App

Test app for Auth Connect (and soon Identity Vault)

## Interesting Auth Connect Issue
When Auth Connect events onLoginSuccess and OnLogout are fired they run outside ngZone. In AuthenticationService.ts line 29 a patch was needed: this.ngZone.run(() to ensure that the UI reflects the authenticated state.
