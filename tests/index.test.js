const { Goal, Count } = require('../extension/core/index');

test('Can set goal', () => {
  goal = new Goal();
  goal.set('Eat pie');
  expect(goal.show()).toEqual('Eat pie');
});

test('Can mark goal complete', () => {
  goal = new Goal();
  goal.set('Eat pie');
  goal.complete()
  expect(goal.show()).toEqual(undefined);
});

test('Can mark goal interupted', () => {
  goal = new Goal();
  goal.set('Eat pie');
  goal.interupt()
  expect(goal.show()).toEqual(undefined);
});

test('Can start count at any number', () => {
  count = new Count(50);
  expect(count.value).toEqual(50);
});

test('Can increment count', () => {
  count = new Count();
  count.increment();
  count.increment();
  expect(count.value).toEqual(2);
});

test('Can reset count', () => {
  count = new Count();
  count.increment();
  count.increment();
  count.reset();
  expect(count.value).toEqual(0);
});

/*

X Set Goal
X Show Goal
X Mark Goal Complete
X Mark Goal Interupted

// Visit Site
//   On Allow List, allow
//   On Block List, block
//   On neither, prompt

// Show Prompt
//   Answer Yes
//   Answer No

// Add to Allow List
// Remove from Allow List
// Add to Block List
// Remove from Block List

X Increment Goals count
X Increment Distractions count
X Increment Interuptions count

Show Goals Count (per day)
Show Distractions Count (per day)
Show Interuptions Count (per day)

*/