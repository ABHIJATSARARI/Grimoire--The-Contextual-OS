# Grimoire Requirements

## Contest Compliance

### Skeleton Crew Category
- [x] Two separate applications
- [x] Shared core logic (90%+ code reuse)
- [x] Demonstrates Kiro's workspace management

### Most Creative Bonus
- [x] Satirical concept with clear thesis
- [x] Makes judges laugh
- [x] Technically sound implementation

## Functional Requirements

### FR1: Dual Application Support
The system SHALL provide two runnable applications:
- `npm run reality` - Unicorn Corp dashboard
- `npm run hell` - Eldritch Cult interface

### FR2: Shared Core Engine
Both applications SHALL import from `@grimoire/core` package with no duplication of business logic.

### FR3: Dictionary-Driven Semantics
All domain-specific terminology SHALL be defined in dictionary objects, not hardcoded in core logic.

### FR4: Visual Differentiation
Each application SHALL have distinct visual styling while maintaining identical functionality.

### FR5: Metric Equivalence
Both applications SHALL produce mathematically identical state transitions for equivalent actions.

## Non-Functional Requirements

### NFR1: Simplicity
The core engine SHALL be under 100 lines of code to maximize clarity of concept.

### NFR2: Extensibility
Adding new "modes" (dictionaries) SHALL require no changes to core engine.

### NFR3: Testability
State transitions SHALL be deterministic and verifiable.

## Kiro-Specific Requirements

### KR1: Spec Documentation
The project SHALL include formal specs in `.kiro/specs/` demonstrating Kiro's spec system.

### KR2: Steering Rules
The project SHALL include context-aware steering rules in `.kiro/steering/`.

### KR3: Git Hooks
The project SHALL include a pre-commit hook demonstrating Kiro's automation capabilities.

## Success Criteria

The project succeeds if:
1. Judges laugh when they realize the apps are identical
2. Code review confirms 90%+ shared logic
3. Demonstrates clear Kiro integration
4. Runs without errors on first try
