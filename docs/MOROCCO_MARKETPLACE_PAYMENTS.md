# Morocco marketplace payments

## Current decision

The marketplace must accept online payments only. Cash and pay-later are disabled for host accounts in the application.

Do not assume that the existing Stripe integration can be used by a company established in Morocco. Morocco is not listed in Stripe's supported business-account countries: https://stripe.com/global

## Provider evaluation

NAPS is the first local provider to evaluate for this project:

- NAPS publicly advertises ePay and API integration for websites and applications.
- NAPS also advertises tailored offers for marketplaces and platforms.
- Public product information does not establish whether NAPS provides split settlement or connected sub-merchant payouts for independent accommodation hosts.

References:
- https://naps.ma/ecommerce-et-marketplaces/
- https://naps.ma/entreprises/accepter-les-paiements/paiements-en-ligne/

## Required written confirmation before implementation

Obtain NAPS's technical and commercial documentation and confirm:

1. Whether one marketplace merchant account can collect guest payments for multiple independent hosts.
2. Whether NAPS supports automatic split settlement, sub-merchant accounts, or only settlement to the marketplace's own bank account.
3. Host onboarding/KYC requirements and who is legally responsible for refunds and chargebacks.
4. MAD settlement, domestic and international card support, 3-D Secure, and mobile web/app checkout support.
5. Payment authorization/capture, full and partial refunds, cancellation handling, and webhook signature verification.
6. Sandbox credentials, API reference, webhook retry rules, reconciliation exports, and production certification.
7. Contractual fees, settlement timing, reserves, and any marketplace-specific restrictions.

## Implementation boundary

The current Stripe and PayPal code is single-merchant checkout code. It does not implement marketplace commission accounting or automatic host payouts. Do not represent those capabilities as complete.

Once the provider confirms the supported settlement model, implement a provider adapter with server-side payment verification, idempotent webhook handling, immutable transaction records, configurable platform commission, host payable balances, refund/chargeback reversals, and auditable payout records. Never calculate host payouts from unverified client-side payment data.
