const { Goal, Count } = require('../extension/core/index');

test('can set goal', () => {
  goal = new Goal();
  goal.set('Eat pie');
  expect(goal.show()).toEqual('Eat pie');
});

test('can mark goal complete', () => {
  goal = new Goal();
  goal.set('Eat pie');
  goal.complete()
  expect(goal.show()).toEqual(undefined);
});

test('can mark goal interupted', () => {
  goal = new Goal();
  goal.set('Eat pie');
  goal.interupt()
  expect(goal.show()).toEqual(undefined);
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