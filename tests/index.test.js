const { turtle } = require('../extension/core/index');

test('Given X', () => {
  expect(turtle()).toStrictEqual('hi');
});

/*

Set Goal
Show Goal
Mark Goal Complete
Mark Goal Interupted

Visit Site
  On Allow List, allow
  On Block List, block
  On neither, prompt

Show Prompt
  Answer Yes
  Answer No

Add to Allow List
Remove from Allow List
Add to Block List
Remove from Block List

Increment Goals count
Increment Distractions count
Increment Interuptions count

Show Goals Count (per day)
Show Distractions Count (per day)
Show Interuptions Count (per day)

*/