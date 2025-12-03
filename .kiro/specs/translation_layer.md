# Translation Layer Specification

## The Rosetta Stone: Startup ↔ Cult Mapping

This spec defines the semantic equivalence between corporate and eldritch terminology.

| Startup Term | Cult Term | Shared Action |
|--------------|-----------|---------------|
| Hire Developer | Summon Demon | GROWTH |
| Burn Runway | Offer Souls | SACRIFICE |
| Daily Standup | Morning Invocation | MEETING |
| Refactor Code | Harvest Entropy | OPTIMIZE |
| Sprint Retrospective | Atonement of Sins | REFLECT |
| Product Launch | Portal Opening | RELEASE |
| User Acquisition | Soul Collection | CONVERT |
| Technical Debt | Karmic Burden | DEBT |
| Pivot Strategy | Ritual Realignment | PIVOT |
| Exit Strategy | Ascension Protocol | EXIT |

## Implementation Rules

1. The core engine (`@grimoire/core`) must remain context-agnostic
2. All semantic meaning is injected via dictionary objects
3. State transitions are identical regardless of dictionary
4. Renderers provide the only UI differentiation

## Acceptance Criteria

- [ ] Both apps execute identical state machine logic
- [ ] Swapping dictionaries produces semantically equivalent outputs
- [ ] No conditional logic based on MODE in core engine
- [ ] Metrics are mathematically identical (followers, resources, energy)
