CREATE TABLE IF NOT EXISTS partner_organizations (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'candidate' CHECK (status IN ('candidate', 'confirmed', 'archived')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS partner_contacts (
  id UUID PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES partner_organizations(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role_label TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS partner_invitation_requests (
  id UUID PRIMARY KEY,
  organization_name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS partner_invitations (
  id UUID PRIMARY KEY,
  contact_id UUID NOT NULL REFERENCES partner_contacts(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'revoked', 'expired', 'completed')),
  expires_at TIMESTAMPTZ NOT NULL,
  last_opened_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS questionnaire_versions (
  id UUID PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  definition_json JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS partner_responses (
  id UUID PRIMARY KEY,
  invitation_id UUID NOT NULL REFERENCES partner_invitations(id) ON DELETE CASCADE,
  questionnaire_version_id UUID NOT NULL REFERENCES questionnaire_versions(id),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted')),
  consented_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submitted_at TIMESTAMPTZ,
  UNIQUE(invitation_id, questionnaire_version_id)
);

CREATE TABLE IF NOT EXISTS partner_response_answers (
  id UUID PRIMARY KEY,
  response_id UUID NOT NULL REFERENCES partner_responses(id) ON DELETE CASCADE,
  question_key TEXT NOT NULL,
  value_json JSONB NOT NULL,
  source TEXT NOT NULL DEFAULT 'typed' CHECK (source IN ('typed', 'voice')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(response_id, question_key)
);

CREATE TABLE IF NOT EXISTS response_events (
  id UUID PRIMARY KEY,
  response_id UUID NOT NULL REFERENCES partner_responses(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE SCHEMA IF NOT EXISTS notifications;

CREATE TABLE IF NOT EXISTS notifications.partner_response_recap_outbox (
  id UUID PRIMARY KEY,
  response_id UUID NOT NULL UNIQUE REFERENCES partner_responses(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  organization_name TEXT NOT NULL,
  subject TEXT NOT NULL,
  summary_text TEXT NOT NULL,
  summary_version TEXT NOT NULL DEFAULT 'v1',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS partner_invitations_contact_idx ON partner_invitations(contact_id);
CREATE INDEX IF NOT EXISTS partner_responses_invitation_idx ON partner_responses(invitation_id);
CREATE INDEX IF NOT EXISTS partner_response_answers_response_idx ON partner_response_answers(response_id);
CREATE INDEX IF NOT EXISTS partner_response_recap_outbox_created_idx ON notifications.partner_response_recap_outbox(created_at);
