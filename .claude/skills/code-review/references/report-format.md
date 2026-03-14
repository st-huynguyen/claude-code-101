# Aggregated Report Format

```markdown
## 📋 Code Review Report

**Branch**: [branch name]
**Files changed**: [count]
**Commits**: [count]

---

### ✅ What Looks Good

[Aggregate positive feedback from all reviewers]

---

## 📊 Review Details by Category

### ⚡ Performance

[Full output from performance-reviewer]

### ✨ Code Quality

[Full output from quality-reviewer]

---

## 📋 Action Items Summary

| Priority         | Count   |
| ---------------- | ------- |
| 🔴 Critical (P0) | [count] |
| 🟠 High (P1)     | [count] |
| 🟡 Medium (P2)   | [count] |
| 🟢 Low (P3)      | [count] |

**Recommendation**: [APPROVE / REQUEST CHANGES / COMMENT]

- APPROVE: No P0/P1 issues, only minor improvements suggested
- REQUEST CHANGES: P0 or multiple P1 issues that must be fixed before merge
- COMMENT: P1 issues that should be addressed but can be merged
```
