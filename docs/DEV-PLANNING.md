# Developer Capacity Planning

## Overview

The Dev Planning feature allows you to plan developer capacity across releases, milestones, and projects. It helps visualize workload distribution and identify capacity issues before they become problems.

## Key Features

### 1. **Release-Based Planning**
- Plan capacity for each configured release
- Visualize milestone phases with working days calculations
- Switch between releases using the dropdown selector

### 2. **Developer Management**
- Add/remove developers from your planning
- Each developer gets their own capacity card
- Visual status indicators:
  - 🔴 **Over Capacity**: Allocated > 100% of capacity
  - 🟡 **At Capacity**: Allocated 90-100% of capacity
  - 🟢 **Good Utilization**: Allocated 70-90% of capacity
  - ⚪ **Under-Utilized**: Allocated < 70% of capacity

### 3. **Phase Availability**
- Set availability percentage for each milestone phase
- Defaults to 100% availability
- Accounts for:
  - Part-time work
  - Training periods
  - Vacation/leave
  - Shared responsibilities

### 4. **Project Allocations**
- Allocate developer time (in days) to specific projects
- Multiple projects per developer
- Real-time capacity calculations
- Visual capacity bar with overflow indicators

### 5. **Automatic Capacity Calculations**
- **Total Capacity** = Sum of (phase working days × availability %)
- **Working Days** = Excludes weekends automatically
- **Remaining Capacity** = Total capacity - allocated days
- **Utilization %** = (Allocated / Capacity) × 100

## How to Use

### Getting Started

1. **Configure Releases First**
   - Go to Config → Releases
   - Add your releases with milestone dates
   - The system will automatically calculate working days between milestones

2. **Add Developers**
   - Click "Add Developer" button
   - Enter developer name
   - Repeat for all team members

3. **Set Phase Availability**
   - Expand "Phase Availability" section for each developer
   - Adjust percentage (0-100) for each phase
   - Example: Set to 50% if developer is working half-time on this release

4. **Add Project Allocations**
   - Expand "Project Allocations" section
   - Click "Add Project"
   - Select project from dropdown
   - Enter estimated days needed
   - Repeat for multiple projects

### Best Practices

#### Realistic Estimates
- Consider only working days (weekends excluded automatically)
- Account for meetings, code reviews, and other overhead
- Use 80-90% availability for phases with heavy meetings
- Leave buffer capacity for unplanned work

#### Regular Updates
- Review capacity weekly during active development
- Update estimates as actual work progresses
- Adjust availability based on team changes

#### Capacity Planning Workflow
1. Start with milestone dates in Releases config
2. Add all developers to planning
3. Set realistic phase availability percentages
4. Allocate projects based on scope and complexity
5. Look for over-capacity developers (red cards)
6. Rebalance work across team members
7. Update as projects progress

## Data Structure

Planning data is stored in browser localStorage under `S.devPlanning`:

```json
{
  "developers": [
    { "id": "dev-001", "name": "John Doe" }
  ],
  "releases": [
    {
      "releaseId": "N2026.R2",
      "developers": [
        {
          "devId": "dev-001",
          "phases": [
            { "phaseId": "DA-KO", "availability": 100 }
          ],
          "projects": [
            { "projectKey": "NFS", "estimateDays": 25 }
          ]
        }
      ]
    }
  ]
}
```

## Integration with Other Views

### Developer Velocity
- Compare planned estimates with actual velocity
- Identify developers falling behind schedule
- Adjust future planning based on historical data

### Team View
- See actual work distribution across developers
- Validate planning against real ticket assignments

### Analytics
- Track project progress against planned capacity
- Identify scope creep early

## Tips

### Handling Over-Capacity
- Reduce scope (move features to next release)
- Add more developers to over-allocated projects
- Increase phase duration (adjust milestone dates)
- Reduce availability on lower-priority projects

### Phase Planning
- **Discovery Alignment (DA)**: Usually lower availability, exploration phase
- **Kickoff to Scope Close (KO-SC)**: High design and planning work
- **Scope Close to Feature Freeze (SC-FF)**: Peak development capacity
- **Feature Freeze to GA**: Lower availability, testing and fixes

### Project Estimation
- Use historical velocity data if available
- Break down large projects into smaller chunks
- Add 20-30% buffer for unknowns
- Consider technical debt and refactoring time

## Troubleshooting

**Q: Why is my capacity showing as 0?**
- A: Check that your release has milestones configured with valid dates
- Ensure the milestone dates are in the future or recent past

**Q: The working days calculation seems wrong**
- A: The system automatically excludes weekends (Saturday/Sunday)
- Holidays are NOT automatically excluded - adjust availability % to account for them

**Q: Can I plan multiple releases simultaneously?**
- A: Yes! Use the release dropdown to switch between releases. Each release maintains separate capacity planning.

**Q: How do I export planning data?**
- A: Planning data is stored in localStorage. You can export it from your browser's developer tools or build a custom export feature.

## Future Enhancements

Potential improvements for this feature:
- Holiday calendar integration
- Export to CSV/Excel
- Historical capacity tracking
- Team-level capacity views
- Integration with JIRA estimates
- Burndown charts per developer
- Capacity forecasting based on velocity
