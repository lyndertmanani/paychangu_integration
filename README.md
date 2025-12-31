 
# PayChangu API Integration – Test Guide

<img src="https://files.readme.io/d7f8cac6b341499ba042072071aa26931cd3dfdccda1b48a0c42043f56a927e7-small-logo.png" alt="PayChangu" width="300" />

**Afrimomo:** [https://afrimomo.fickson.com/](https://afrimomo.fickson.com/)

This document defines the **step-by-step testing strategy** for integrating **PayChangu** and validating its usage through **Afrimomo MCP (Model Context Protocol)**.

The testing is intentionally split into **two clear phases** to ensure reliability, correctness, and isolation of issues.

---

## Objectives

1. Validate **PayChangu API** independently as the source of truth
2. Confirm **Afrimomo MCP** behaves exactly like direct PayChangu API usage
3. Ensure readiness for AI-driven payment operations

---

## Testing Phases Overview

| Phase | Component     | Purpose                                |
| ----: | ------------- | -------------------------------------- |
|     1 | PayChangu API | Core payment and payout validation     |
|     2 | Afrimomo MCP  | AI-driven interaction layer validation |

---

# Phase 1: PayChangu API Testing

## Purpose

To confirm that **PayChangu works correctly on its own**, without any abstraction or AI tooling involved.

This phase establishes PayChangu as a **stable and trusted payment provider** before introducing Afrimomo MCP.

---

## Scope of Testing

The following PayChangu features are tested:

* Hosted checkout payments
* Transaction verification
* Direct charges (virtual accounts)
* Mobile money operators discovery
* Mobile money payouts
* Bank payouts and transfers

---

## Assumptions

All tests assume:

* **Environment:** Sandbox
* **Country:** Malawi
* **Currency:** MWK

---

## Requirements

* PayChangu sandbox account
* PayChangu **Secret Key**
* Node.js v18 or higher

---

## Environment Setup

```bash
export PAYCHANGU_SECRET_KEY=your-paychangu-secret-key
export ENVIRONMENT=DEVELOPMENT
```

---

## PayChangu API Test Cases

### 1. Verify Transaction

**Objective:** Confirm a transaction can be verified successfully.

```text
Verify PayChangu transaction TX_12345
```

**Expected Result**

* Valid transaction status
* Correct amount and currency
* No authentication errors

---

### 2. List Mobile Money Operators

**Objective:** Retrieve all supported mobile money operators.

```text
Show all supported PayChangu mobile money operators
```

**Expected Result**

* List of operators
* Operator IDs and names returned correctly

---

### 3. Initiate Direct Charge

**Objective:** Create a direct charge using virtual accounts.

```text
Create a PayChangu direct charge of 5000 MWK with charge ID CHARGE_001
```

**Expected Result**

* Charge created successfully
* Charge reference returned

---

### 4. Send Mobile Money Payout

**Objective:** Send funds to a mobile money number.

```text
Send PayChangu mobile money payout of 3000 MWK to 0999123456
```

**Expected Result**

* Payout request accepted
* Valid payout status returned

---

### 5. Send Bank Payout

**Objective:** Transfer funds to a bank account.

```text
Send PayChangu bank payout of 10000 MWK to account 123456 at bank [bank_uuid]
```

**Expected Result**

* Bank payout initiated
* Transfer reference returned

---

## Error & Edge Case Testing (Recommended)

* Invalid transaction reference
* Insufficient balance for payout
* Invalid phone number format
* Unsupported operator or bank

---

## Phase 1 Success Criteria

Phase 1 is considered **successful** when:

* Transactions verify correctly
* Payouts return valid statuses
* No authentication or signature errors occur
* Sandbox responses match PayChangu documentation

---

# Phase 2: Afrimomo MCP Testing

## Purpose

To validate **Afrimomo MCP** as a **thin orchestration layer** on top of PayChangu, enabling natural-language payment operations without changing PayChangu behavior.

---

## Afrimomo MCP Installation

```bash
npm install -g afrimomo-mcp
# or
npx afrimomo-mcp
```

---

## Claude Desktop Configuration

### macOS

```
~/Library/Application Support/Claude/claude_desktop_config.json
```

### Windows

```
%APPDATA%\Claude\claude_desktop_config.json
```

### Configuration File

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

## Afrimomo PayChangu Test Commands

```text
Verify PayChangu transaction TX_12345
Show me PayChangu mobile money operators
Send PayChangu bank payout of 8000 MWK to account 123456
```

---

## MCP Tool Discovery Test

```text
List all available Afrimomo payment tools
```

**Expected Result**

* PayChangu tools are visible
* Tool names are descriptive and usable

---

## Phase 2 Success Criteria

Phase 2 is considered **successful** when:

* All PayChangu tools appear in Claude
* Commands execute correctly via natural language
* Responses match direct PayChangu API behavior
* Errors are human-readable and deterministic

---

## Final Testing Status

| Stage         | Purpose                       | Status |
| ------------- | ----------------------------- | ------ |
| PayChangu API | Core payment validation       | ⬜      |
| Afrimomo MCP  | AI-driven payment interaction | ⬜      |

 
