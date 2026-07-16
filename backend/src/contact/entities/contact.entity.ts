// ──────────────────────────────────────────────────────────────
// CONTACT ENTITY
// ──────────────────────────────────────────────────────────────
//
// This defines the shape of the contact message data returned to clients.
// ──────────────────────────────────────────────────────────────

export class ContactEntity {
  id?: string;
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  isRead?: boolean;
  createdAt?: Date;
}
