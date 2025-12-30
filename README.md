Got it 👍
Here’s a **clear, simple README** that reflects your flow properly: **first testing PayChangu API directly, then testing Afrimomo (MCP) on top of it**.

---

# PayChangu API Integration – Test Guide

This repository documents the **testing process for PayChangu API integration**, followed by **Afrimomo MCP testing**, which builds on top of PayChangu and other African payment providers.

The goal is to:

1. **Confirm PayChangu works correctly on its own**
2. **Validate Afrimomo MCP integration once PayChangu is proven stable**

---

## Phase 1: PayChangu API Testing

### Purpose

To test PayChangu’s core payment features independently before introducing Afrimomo.

### Features Tested

* Hosted checkout payments
* Transaction verification
* Direct charges (virtual accounts)
* Mobile money operators
* Mobile money payouts
* Bank payouts and transfers

### Requirements

* PayChangu sandbox account
* PayChangu **Secret Key**
* Node.js (v18+ recommended)

---

### Environment Setup

```bash
export PAYCHANGU_SECRET_KEY=your-paychangu-secret-key
export ENVIRONMENT=DEVELOPMENT
```

---

### PayChangu API Test Cases

#### 1. Verify Transaction

```text
Verify PayChangu transaction TX_12345
```

#### 2. List Mobile Money Operators

```text
Show all supported PayChangu mobile money operators
```

#### 3. Initiate Direct Charge

```text
Create a PayChangu direct charge of 5000 MWK with charge ID CHARGE_001
```

#### 4. Send Mobile Money Payout

```text
Send PayChangu mobile money payout of 3000 MWK to 0999123456
```

#### 5. Send Bank Payout

```text
Send PayChangu bank payout of 10000 MWK to account 123456 at bank [bank_uuid]
```

---

### Phase 1 Success Criteria

PayChangu integration is considered **successful** when:

* Transactions verify correctly
* Payouts return valid statuses
* No authentication or signature errors occur
* Sandbox responses match documentation

---

## Phase 2: Afrimomo MCP Testing

Once PayChangu passes all tests, proceed to **Afrimomo MCP**, which exposes PayChangu through the **Model Context Protocol (MCP)**.

---

### Install Afrimomo MCP

```bash
npm install -g afrimomo-mcp
# or
npx afrimomo-mcp
```

---

### Configure Claude Desktop

**macOS**

```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Windows**

```
%APPDATA%\Claude\claude_desktop_config.json
```

```json
{
  "mcpServers": {
    "afrimomo": {
      "command": "npx",
      "args": ["-y", "afrimomo-mcp"],
      "env": {
        "PAYCHANGU_SECRET_KEY": "your-paychangu-secret-key",
        "ENVIRONMENT": "DEVELOPMENT"
      }
    }
  }
}
```

Restart Claude Desktop after saving.

---

### Afrimomo PayChangu Tests

```text
Verify PayChangu transaction TX_12345
Show me PayChangu mobile money operators
Send PayChangu bank payout of 8000 MWK to account 123456
```

---

### Phase 2 Success Criteria

Afrimomo integration is considered **successful** when:

* All PayChangu tools appear in Claude
* Commands execute correctly via natural language
* Responses match direct PayChangu API behavior

---

## Testing Strategy Summary

| Stage         | Purpose                       | Status |
| ------------- | ----------------------------- | ------ |
| PayChangu API | Core payment validation       | ⬜      |
| Afrimomo MCP  | AI-driven payment interaction | ⬜      |

---

 
 
