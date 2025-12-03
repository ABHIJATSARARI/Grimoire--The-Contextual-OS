# Grimoire Design Document

## Core Principle: Contextual Isomorphism

The system demonstrates that two seemingly opposite domains (corporate tech, occult rituals) are **structurally identical** when abstracted to their core operations.

## Correctness Properties

### P1: State Determinism
Given identical action sequences, both apps MUST produce identical state transitions regardless of dictionary.

**Verification**: Run both apps with same parameters, compare final metrics.

### P2: Context Isolation
The core engine (`@grimoire/core`) MUST NOT contain any MODE-specific logic or conditionals.

**Verification**: Grep for "REALITY", "HELL", "startup", "cult" in core package - should return 0 results.

### P3: Semantic Equivalence
Every action in REALITY_DICTIONARY MUST have a corresponding action in HELL_DICTIONARY with identical state effects.

**Verification**: Compare state deltas for mapped actions.

### P4: Renderer Independence
Swapping renderers MUST NOT affect state calculations.

**Verification**: Run with null renderer, verify state still updates correctly.

## Architecture Decisions

### Why Abstract State Machine?
- Eliminates duplication
- Forces semantic thinking
- Makes the satire obvious to judges

### Why Separate Apps?
- Satisfies contest "2 apps" requirement
- Allows different UI frameworks (React vs Three.js in future)
- Demonstrates Kiro's multi-app workspace management

### Why Dictionaries?
- Single source of truth for terminology
- Easy to extend (add new languages: Pirate, Shakespearean, etc.)
- Makes the joke explicit

## Extension Points

Future dictionaries could include:
- `ACADEMIA_DICTIONARY`: "Publish paper", "Apply for grant"
- `MILITARY_DICTIONARY`: "Deploy troops", "Secure resources"
- `RELIGION_DICTIONARY`: "Convert followers", "Collect tithes"

All would produce identical state machines. The point: **all hierarchical organizations are the same**.

## Kiro Integration Strategy

This project showcases:

1. **Specs**: Translation layer defined formally
2. **Steering**: Context-aware code generation rules
3. **Hooks**: Automated commit message transformation
4. **Workspace**: Monorepo with shared packages

The meta-joke: We used an AI to prove that all organizations (including AI companies) follow the same patterns.
