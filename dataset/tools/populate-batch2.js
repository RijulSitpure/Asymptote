import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');

// Definition of 15 Batch 2 problems
export const BATCH2_PROBLEMS = [
  {
    slug: 'min-stack',
    number: 155,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    twist_type: 'Parallel Auxiliary Minimum Stack',
    method: 'MinStack',
    hints: [
      {
        level: 1,
        title: 'Constant Time Minimum Retrieval',
        text: 'How can you retrieve the minimum element in constant time during removal without scanning every element?'
      },
      {
        level: 2,
        title: 'Parallel History of Minimums',
        text: 'Pair each value with the minimum observed up to that point, or record each new minimum alongside the regular sequence.'
      },
      {
        level: 3,
        title: 'Synchronized Minimum Sequence Procedure',
        text: 'Maintain an auxiliary sequence for minimums. When pushing a value, also record it if it is less than or equal to the current minimum. When removing an element, if it matches the current minimum, remove it from the auxiliary sequence as well. Top and getMin return the respective tops.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)

    def pop(self) -> None:
        val = self.stack.pop()
        if val == self.min_stack[-1]:
            self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(N)',
      variables: ['N: total number of elements pushed onto stack (at most 3 * 10^4 operations)'],
      notes: 'All operations push, pop, top, and getMin run in strictly O(1) time.',
      whyNaiveFails: 'Scanning the entire stack to find the minimum on every getMin call takes O(N) time. With up to 3 * 10^4 operations, repeated linear scans result in ~9 * 10^8 operations, leading to Time Limit Exceeded.',
      spaceTimeTradeoff: 'Maintaining a parallel min-stack uses O(N) auxiliary space to achieve O(1) time across all four operations.',
      interviewerExpectation: 'Constant time for all four operations, clean handling of duplicate minimums using <= in push, and zero memory leaks.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)

    def pop(self) -> None:
        val = self.stack.pop()
        if val == self.min_stack[-1]:
            self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]`,
        approach: 'Two Synchronized Lists for Values and Minimums',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>
#include <stack>

using namespace std;

class MinStack {
private:
    stack<int> s;
    stack<int> min_s;
public:
    MinStack() {}

    void push(int val) {
        s.push(val);
        if (min_s.empty() || val <= min_s.top()) {
            min_s.push(val);
        }
    }

    void pop() {
        if (s.top() == min_s.top()) {
            min_s.pop();
        }
        s.pop();
    }

    int top() {
        return s.top();
    }

    int getMin() {
        return min_s.top();
    }
};`,
        approach: 'Parallel Stacks with Duplicate Minimum Tracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.ArrayDeque;
import java.util.Deque;

class MinStack {
    private Deque<Integer> stack;
    private Deque<Integer> minStack;

    public MinStack() {
        stack = new ArrayDeque<>();
        minStack = new ArrayDeque<>();
    }

    public void push(int val) {
        stack.push(val);
        if (minStack.isEmpty() || val <= minStack.peek()) {
            minStack.push(val);
        }
    }

    public void pop() {
        int val = stack.pop();
        if (val == minStack.peek()) {
            minStack.pop();
        }
    }

    public int top() {
        return stack.peek();
    }

    public int getMin() {
        return minStack.peek();
    }
}`,
        approach: 'Two Deques for Constant Time Minimum Retrieval',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `var MinStack = function() {
    this.stack = [];
    this.minStack = [];
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
    this.stack.push(val);
    if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
        this.minStack.push(val);
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    const val = this.stack.pop();
    if (val === this.minStack[this.minStack.length - 1]) {
        this.minStack.pop();
    }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.minStack[this.minStack.length - 1];
};`,
        approach: 'Parallel Prototype Arrays',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'evaluate-reverse-polish-notation',
    number: 150,
    category: 'Algorithms',
    patterns: ['stack-parentheses-parser'],
    twist_type: 'Postfix Stack Evaluation with Zero Truncation',
    method: 'evalRPN',
    hints: [
      {
        level: 1,
        title: 'Operand Precedence and Order',
        text: 'In postfix notation, operands precede operators. How can you hold incoming numbers until an operation consumes the most recent two?'
      },
      {
        level: 2,
        title: 'Consuming Most Recent Operands',
        text: 'An operator always combines the two most recently accumulated numbers. The second removed value is the left operand and the first removed value is the right operand.'
      },
      {
        level: 3,
        title: 'Evaluation Procedure with Zero Truncation',
        text: 'Iterate through tokens. If token is an integer, record it. If it is an operator, take the two most recent numbers, apply the operation, truncating toward zero for division, and store the result. Return the final remaining number.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def evalRPN(self, tokens: list[str]) -> int:
        stack = []
        for token in tokens:
            if token == '+':
                stack.append(stack.pop() + stack.pop())
            elif token == '-':
                b = stack.pop()
                a = stack.pop()
                stack.append(a - b)
            elif token == '*':
                stack.append(stack.pop() * stack.pop())
            elif token == '/':
                b = stack.pop()
                a = stack.pop()
                stack.append(int(a / b))
            else:
                stack.append(int(token))
        return stack[0]
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of tokens in the expression (1 <= N <= 10^4)'],
      notes: 'Single pass over tokens with O(1) push and pop operations.',
      whyNaiveFails: 'Repeatedly scanning the string to find operator-operand triplets and splicing them in-place takes O(N^2) time due to array shifts. For N = 10^4, this is too slow.',
      spaceTimeTradeoff: 'A single linear scan with an auxiliary stack uses O(N) auxiliary space to achieve O(N) time.',
      interviewerExpectation: 'Proper handling of integer division truncating toward zero (especially negative numbers in Python: int(a / b) rather than a // b), operand order awareness (left - right, left / right), and single-element edge case.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def evalRPN(self, tokens: list[str]) -> int:
        stack = []
        for token in tokens:
            if token == '+':
                stack.append(stack.pop() + stack.pop())
            elif token == '-':
                b = stack.pop()
                a = stack.pop()
                stack.append(a - b)
            elif token == '*':
                stack.append(stack.pop() * stack.pop())
            elif token == '/':
                b = stack.pop()
                a = stack.pop()
                stack.append(int(a / b))
            else:
                stack.append(int(token))
        return stack[0]`,
        approach: 'Operand Stack with Explicit Zero Truncation',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>
#include <string>
#include <stack>

using namespace std;

class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<int> s;
        for (const string& token : tokens) {
            if (token == "+" || token == "-" || token == "*" || token == "/") {
                int b = s.top(); s.pop();
                int a = s.top(); s.pop();
                if (token == "+") s.push(a + b);
                else if (token == "-") s.push(a - b);
                else if (token == "*") s.push(a * b);
                else s.push(a / b);
            } else {
                s.push(stoi(token));
            }
        }
        return s.top();
    }
};`,
        approach: 'Stack-based Evaluation with Native Integer Division',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public int evalRPN(String[] tokens) {
        Deque<Integer> stack = new ArrayDeque<>();
        for (String token : tokens) {
            if (token.equals("+") || token.equals("-") || token.equals("*") || token.equals("/")) {
                int b = stack.pop();
                int a = stack.pop();
                if (token.equals("+")) stack.push(a + b);
                else if (token.equals("-")) stack.push(a - b);
                else if (token.equals("*")) stack.push(a * b);
                else stack.push(a / b);
            } else {
                stack.push(Integer.parseInt(token));
            }
        }
        return stack.pop();
    }
}`,
        approach: 'Deque Stack with Integer Parsing',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
    const stack = [];
    for (const token of tokens) {
        if (token === '+' || token === '-' || token === '*' || token === '/') {
            const b = stack.pop();
            const a = stack.pop();
            if (token === '+') stack.push(a + b);
            else if (token === '-') stack.push(a - b);
            else if (token === '*') stack.push(a * b);
            else stack.push(Math.trunc(a / b));
        } else {
            stack.push(Number(token));
        }
    }
    return stack[0];
};`,
        approach: 'Stack with Math.trunc for Division',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'car-fleet',
    number: 853,
    category: 'Algorithms',
    patterns: ['stack-monotonic-next-greater'],
    twist_type: 'Monotonic Time-to-Target Fleet Merging',
    method: 'carFleet',
    hints: [
      {
        level: 1,
        title: 'Overtaking Restriction',
        text: 'A faster car cannot pass a slower car ahead of it. How can sorting cars by initial position simplify the arrival order?'
      },
      {
        level: 2,
        title: 'Arrival Time Monotonicity',
        text: 'If a car starts behind another car and reaches the target in less or equal time, it catches up and merges into that car\'s fleet before or at the target.'
      },
      {
        level: 3,
        title: 'Backward Pass Fleet Tracking',
        text: 'Pair each car position with speed and sort descending by position. Calculate time to target as (target - position) / speed. If the current car takes strictly more time than the leading fleet ahead, it forms a new fleet and becomes the new lead time. Count total fleets formed.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def carFleet(self, target: int, position: list[int], speed: list[int]) -> int:
        cars = sorted(zip(position, speed), reverse=True)
        fleets = 0
        lead_time = 0.0
        for pos, spd in cars:
            time_needed = (target - pos) / spd
            if time_needed > lead_time:
                fleets += 1
                lead_time = time_needed
        return fleets
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: number of cars (1 <= N <= 10^5)'],
      notes: 'Sorting cars takes O(N log N) time, followed by an O(N) backward pass.',
      whyNaiveFails: 'Simulating time step by step requires discrete time increments that fail with fractional catch-up times or large target distances (target up to 10^6).',
      spaceTimeTradeoff: 'Sorting by initial position in O(N log N) time and O(N) space allows determining fleet formation in a single backward pass without step-by-step physics simulation.',
      interviewerExpectation: 'Understanding that sorting descending by position eliminates overtaking ambiguity, using floating-point time calculations accurately, and collapsing fleets without simulating time steps.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def carFleet(self, target: int, position: list[int], speed: list[int]) -> int:
        cars = sorted(zip(position, speed), reverse=True)
        fleets = 0
        lead_time = 0.0
        for pos, spd in cars:
            time_needed = (target - pos) / spd
            if time_needed > lead_time:
                fleets += 1
                lead_time = time_needed
        return fleets`,
        approach: 'Sort Descending by Position with Running Lead Time',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int carFleet(int target, vector<int>& position, vector<int>& speed) {
        int n = position.size();
        if (n == 0) return 0;
        vector<pair<int, int>> cars(n);
        for (int i = 0; i < n; i++) {
            cars[i] = {position[i], speed[i]};
        }
        sort(cars.begin(), cars.end(), [](const pair<int, int>& a, const pair<int, int>& b) {
            return a.first > b.first;
        });
        int fleets = 0;
        double leadTime = 0.0;
        for (int i = 0; i < n; i++) {
            double timeNeeded = (double)(target - cars[i].first) / cars[i].second;
            if (timeNeeded > leadTime) {
                fleets++;
                leadTime = timeNeeded;
            }
        }
        return fleets;
    }
};`,
        approach: 'Sorted Pair Vector with Lead Time Comparison',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.Arrays;

class Solution {
    public int carFleet(int target, int[] position, int[] speed) {
        int n = position.length;
        if (n == 0) return 0;
        double[][] cars = new double[n][2];
        for (int i = 0; i < n; i++) {
            cars[i][0] = position[i];
            cars[i][1] = speed[i];
        }
        Arrays.sort(cars, (a, b) -> Double.compare(b[0], a[0]));
        int fleets = 0;
        double leadTime = 0.0;
        for (int i = 0; i < n; i++) {
            double timeNeeded = (target - cars[i][0]) / cars[i][1];
            if (timeNeeded > leadTime) {
                fleets++;
                leadTime = timeNeeded;
            }
        }
        return fleets;
    }
}`,
        approach: 'Sorted 2D Array with Running Fleet Barrier',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
var carFleet = function(target, position, speed) {
    const n = position.length;
    if (n === 0) return 0;
    const cars = [];
    for (let i = 0; i < n; i++) {
        cars.push([position[i], speed[i]]);
    }
    cars.sort((a, b) => b[0] - a[0]);
    let fleets = 0;
    let leadTime = 0;
    for (let i = 0; i < n; i++) {
        const timeNeeded = (target - cars[i][0]) / cars[i][1];
        if (timeNeeded > leadTime) {
            fleets++;
            leadTime = timeNeeded;
        }
    }
    return fleets;
};`,
        approach: 'Sorted Array with Descending Arrival Threshold',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'largest-rectangle-in-histogram',
    number: 84,
    category: 'Algorithms',
    patterns: ['stack-monotonic-next-greater'],
    twist_type: 'Monotonic Increasing Stack with Width Expansion',
    method: 'largestRectangleArea',
    hints: [
      {
        level: 1,
        title: 'Bar Width and Limiting Height',
        text: 'For each bar, what defines the widest horizontal rectangle that uses this bar\'s full vertical height?'
      },
      {
        level: 2,
        title: 'Boundary Determination by Smaller Bars',
        text: 'A bar\'s rectangle extends left and right until encountering a bar shorter than itself. The width is determined by the first smaller bar on either side.'
      },
      {
        level: 3,
        title: 'Monotonic Increasing Index Tracking',
        text: 'Traverse the histogram while maintaining indices of bars with increasing heights. When a shorter bar is encountered, resolve bars whose heights exceed the current height: calculate width using current index and preceding boundary, update maximum area, and push the adjusted starting position.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def largestRectangleArea(self, heights: list[int]) -> int:
        stack = []
        max_area = 0
        extended = heights + [0]
        for i, h in enumerate(extended):
            start = i
            while stack and stack[-1][1] > h:
                idx, prev_h = stack.pop()
                max_area = max(max_area, prev_h * (i - idx))
                start = idx
            stack.append((start, h))
        return max_area
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of bars in histogram (1 <= N <= 10^5)'],
      notes: 'Every bar index is pushed and popped at most once, giving linear time.',
      whyNaiveFails: 'Checking all pairs of left and right boundaries takes O(N^2) or O(N^3) time. For N = 10^5, N^2 = 10^10 operations which severely exceeds time limits.',
      spaceTimeTradeoff: 'Storing indices in an auxiliary structure uses O(N) space to achieve linear O(N) time because every bar is pushed and popped at most once.',
      interviewerExpectation: 'Explaining monotonic increasing invariant, correct width calculation i - stack[-1] - 1 with sentinel/boundary handling, and single-pass execution.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def largestRectangleArea(self, heights: list[int]) -> int:
        stack = []
        max_area = 0
        extended = heights + [0]
        for i, h in enumerate(extended):
            start = i
            while stack and stack[-1][1] > h:
                idx, prev_h = stack.pop()
                max_area = max(max_area, prev_h * (i - idx))
                start = idx
            stack.append((start, h))
        return max_area`,
        approach: 'Monotonic Stack of (Index, Height) Pairs with 0 Sentinel',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>
#include <stack>
#include <algorithm>

using namespace std;

class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        stack<int> s;
        int maxArea = 0;
        int n = heights.size();
        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            while (!s.empty() && heights[s.top()] > h) {
                int height = heights[s.top()];
                s.pop();
                int width = s.empty() ? i : i - s.top() - 1;
                maxArea = max(maxArea, height * width);
            }
            s.push(i);
        }
        return maxArea;
    }
};`,
        approach: 'Monotonic Increasing Index Stack with Sentinel 0',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public int largestRectangleArea(int[] heights) {
        Deque<Integer> stack = new ArrayDeque<>();
        int maxArea = 0;
        int n = heights.length;
        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            while (!stack.isEmpty() && heights[stack.peek()] > h) {
                int height = heights[stack.pop()];
                int width = stack.isEmpty() ? i : i - stack.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }
        return maxArea;
    }
}`,
        approach: 'Deque Index Stack with Width Calculation',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
    const stack = [];
    let maxArea = 0;
    const n = heights.length;
    for (let i = 0; i <= n; i++) {
        const h = (i === n) ? 0 : heights[i];
        while (stack.length > 0 && heights[stack[stack.length - 1]] > h) {
            const height = heights[stack.pop()];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }
    return maxArea;
};`,
        approach: 'Index Stack with Right Boundary Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'binary-search',
    number: 704,
    category: 'Algorithms',
    patterns: ['binary-search-basic'],
    twist_type: 'Classic Half-Interval Elimination',
    method: 'search',
    hints: [
      {
        level: 1,
        title: 'Sorted Array Halving',
        text: 'Scanning every element sequentially takes linear time. Given that the input array is already sorted, how can comparing against the middle element eliminate half the remaining candidates?'
      },
      {
        level: 2,
        title: 'Directional Elimination by Middle Comparison',
        text: 'If the middle element is less than the target, the target must lie strictly to the right. If greater, it lies strictly to the left.'
      },
      {
        level: 3,
        title: 'Two Boundary Iterative Elimination',
        text: 'Initialize left = 0 and right = len(nums) - 1. While left <= right, compute mid using left + (right - left) // 2. If nums[mid] equals target, return mid. If nums[mid] < target, advance left = mid + 1; otherwise set right = mid - 1. Return -1 if not found.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def search(self, nums: list[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return -1
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(log N)',
      space: 'O(1)',
      variables: ['N: length of nums array (1 <= N <= 10^4)'],
      notes: 'Halves the search range in each iteration using O(1) auxiliary variables.',
      whyNaiveFails: 'Linear scan takes O(N) time. While it passes small inputs, it does not leverage the sorted invariant and is suboptimal for search queries.',
      spaceTimeTradeoff: 'Logarithmic O(log N) time with O(1) auxiliary space by repeatedly halving the search space.',
      interviewerExpectation: 'Safe midpoint calculation left + (right - left) // 2 to prevent integer overflow in languages with fixed-width integers, exact loop boundary left <= right, and correct pointer updates mid + 1 and mid - 1.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return -1`,
        approach: 'Iterative Two-Pointer Binary Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>

using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0;
        int right = (int)nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
};`,
        approach: 'Standard C++ Binary Search with Overflow Prevention',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}`,
        approach: 'Iterative Java Binary Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
};`,
        approach: 'Floor-based Binary Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'search-a-2d-matrix',
    number: 74,
    category: 'Algorithms',
    patterns: ['binary-search-basic'],
    twist_type: 'Virtual 1D Coordinate Mapping Binary Search',
    method: 'searchMatrix',
    hints: [
      {
        level: 1,
        title: 'Row and Column Global Order',
        text: 'Each row is sorted and the first integer of each row is greater than the last integer of the previous row. How can this 2D grid be viewed as a single continuous 1D sorted sequence?'
      },
      {
        level: 2,
        title: 'Virtual Coordinate Flattening',
        text: 'An element at virtual 1D index k in an m x n matrix corresponds directly to row k // n and column k % n without copying data.'
      },
      {
        level: 3,
        title: 'Virtual Index Elimination',
        text: 'Treat the m x n matrix as a 1D range from 0 to m * n - 1. Maintain low = 0 and high = m * n - 1. For each midpoint, map coordinates to matrix[mid // n][mid % n]. Compare with target, adjusting low or high until matched or exhausted.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:
        if not matrix or not matrix[0]:
            return False
        m, n = len(matrix), len(matrix[0])
        left, right = 0, m * n - 1
        while left <= right:
            mid = left + (right - left) // 2
            val = matrix[mid // n][mid % n]
            if val == target:
                return True
            elif val < target:
                left = mid + 1
            else:
                right = mid - 1
        return False
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(log(M * N))',
      space: 'O(1)',
      variables: ['M: number of rows (1 <= M <= 100)', 'N: number of columns (1 <= N <= 100)'],
      notes: 'Treats the 2D matrix as a virtual 1D array of length M * N.',
      whyNaiveFails: 'Scanning all M * N elements takes O(M * N) time. Even row-by-row searching takes O(M log N), missing the global sorted property.',
      spaceTimeTradeoff: 'Virtual 1D index mapping achieves optimal O(log(M * N)) time without allocating any flattened 1D array, maintaining O(1) auxiliary space.',
      interviewerExpectation: 'Single search over M * N with coordinate division/modulo, handling empty matrix edge cases, and avoiding redundant array copies.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:
        if not matrix or not matrix[0]:
            return False
        m, n = len(matrix), len(matrix[0])
        left, right = 0, m * n - 1
        while left <= right:
            mid = left + (right - left) // 2
            val = matrix[mid // n][mid % n]
            if val == target:
                return True
            elif val < target:
                left = mid + 1
            else:
                right = mid - 1
        return False`,
        approach: 'Virtual 1D Array Coordinate Mapping',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>

using namespace std;

class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if (matrix.empty() || matrix[0].empty()) return false;
        int m = matrix.size();
        int n = matrix[0].size();
        int left = 0;
        int right = m * n - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int val = matrix[mid / n][mid % n];
            if (val == target) {
                return true;
            } else if (val < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return false;
    }
};`,
        approach: 'Virtual Flattening with Quotient and Remainder',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return false;
        int m = matrix.length;
        int n = matrix[0].length;
        int left = 0;
        int right = m * n - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int val = matrix[mid / n][mid % n];
            if (val == target) {
                return true;
            } else if (val < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return false;
    }
}`,
        approach: 'Virtual 1D Grid Binary Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) return false;
    const m = matrix.length;
    const n = matrix[0].length;
    let left = 0;
    let right = m * n - 1;
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        const val = matrix[Math.floor(mid / n)][mid % n];
        if (val === target) {
            return true;
        } else if (val < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return false;
};`,
        approach: 'Virtual 1D Coordinates with Math.floor',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'koko-eating-bananas',
    number: 875,
    category: 'Algorithms',
    patterns: ['binary-search-answer'],
    twist_type: 'Binary Search on Answer Space with Feasibility Invariant',
    method: 'minEatingSpeed',
    hints: [
      {
        level: 1,
        title: 'Monotonic Eating Speed',
        text: 'If Koko eats at speed k, the total hours required decreases monotonically as k increases. What is the smallest and largest possible eating speed?'
      },
      {
        level: 2,
        title: 'Feasibility Threshold Property',
        text: 'If speed k is sufficient to finish within h hours, any speed greater than k is also sufficient. The goal is to find the boundary of feasibility.'
      },
      {
        level: 3,
        title: 'Answer Space Range Halving',
        text: 'Set search range left = 1 and right = max(piles). While left < right, pick mid and sum ceil(pile / mid) across all piles. If total hours <= h, the speed is feasible, so set right = mid. Otherwise set left = mid + 1. Return left upon convergence.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def minEatingSpeed(self, piles: list[int], h: int) -> int:
        left, right = 1, max(piles)
        while left < right:
            mid = left + (right - left) // 2
            hours = sum((p + mid - 1) // mid for p in piles)
            if hours <= h:
                right = mid
            else:
                left = mid + 1
        return left
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N log(max(P)))',
      space: 'O(1)',
      variables: ['N: number of banana piles (1 <= N <= 10^4)', 'max(P): maximum bananas in a single pile (1 <= max(P) <= 10^9)'],
      notes: 'Binary search over speeds [1, max(piles)] with O(N) feasibility check per step.',
      whyNaiveFails: 'Testing each speed k linearly starting from 1 takes O(N * max(P)) time. With max(P) = 10^9 and N = 10^4, this requires 10^13 operations, which results in TLE.',
      spaceTimeTradeoff: 'Searching the answer space reduces the number of feasibility checks from max(P) to log2(max(P)) ≈ 30 evaluations, with O(1) auxiliary space.',
      interviewerExpectation: 'Recognizing the monotonic predicate f(k) <= h, avoiding floating-point precision issues using integer arithmetic (p + k - 1) // k, and maintaining the correct invariant right = mid.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def minEatingSpeed(self, piles: list[int], h: int) -> int:
        left, right = 1, max(piles)
        while left < right:
            mid = left + (right - left) // 2
            hours = sum((p + mid - 1) // mid for p in piles)
            if hours <= h:
                right = mid
            else:
                left = mid + 1
        return left`,
        approach: 'Binary Search on Answer Space with Integer Ceiling',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        int left = 1;
        int right = *max_element(piles.begin(), piles.end());
        while (left < right) {
            int mid = left + (right - left) / 2;
            long long hours = 0;
            for (int p : piles) {
                hours += (p + mid - 1) / mid;
            }
            if (hours <= h) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }
};`,
        approach: 'Answer Binary Search with 64-bit Hour Accumulator',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int left = 1;
        int right = 0;
        for (int p : piles) {
            if (p > right) right = p;
        }
        while (left < right) {
            int mid = left + (right - left) / 2;
            long hours = 0;
            for (int p : piles) {
                hours += (p + mid - 1) / mid;
            }
            if (hours <= h) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }
}`,
        approach: 'Feasibility Monotonic Predicate Binary Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function(piles, h) {
    let left = 1;
    let right = Math.max(...piles);
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        let hours = 0;
        for (const p of piles) {
            hours += Math.floor((p + mid - 1) / mid);
        }
        if (hours <= h) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
};`,
        approach: 'Answer Search with Ceiling Divisor',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'find-minimum-in-rotated-sorted-array',
    number: 153,
    category: 'Algorithms',
    patterns: ['binary-search-rotated'],
    twist_type: 'Right-Boundary Comparison Pivot Invariant',
    method: 'findMin',
    hints: [
      {
        level: 1,
        title: 'Inflection Point Detection',
        text: 'In an array rotated between 1 and n times, one half is always strictly sorted while the other half contains the inflection point. How can comparing the middle element with the rightmost element locate the minimum?'
      },
      {
        level: 2,
        title: 'Right Boundary Comparison',
        text: 'If nums[mid] > nums[right], the minimum resides strictly to the right of mid. If nums[mid] <= nums[right], the minimum is at mid or to its left.'
      },
      {
        level: 3,
        title: 'Rotated Range Reduction',
        text: 'Initialize left = 0 and right = len(nums) - 1. While left < right, compute mid. If nums[mid] > nums[right], the pivot lies right, so set left = mid + 1. Otherwise set right = mid. When left == right, return nums[left].'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def findMin(self, nums: list[int]) -> int:
        left, right = 0, len(nums) - 1
        while left < right:
            mid = left + (right - left) // 2
            if nums[mid] > nums[right]:
                left = mid + 1
            else:
                right = mid
        return nums[left]
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(log N)',
      space: 'O(1)',
      variables: ['N: length of nums array (1 <= N <= 5000)'],
      notes: 'Halves the search interval on each step by comparing with rightmost element.',
      whyNaiveFails: 'Linear scan takes O(N) time. The problem specifically asks for an algorithm that runs in O(log N) time.',
      spaceTimeTradeoff: 'Logarithmic O(log N) time and O(1) auxiliary space by comparing against nums[right].',
      interviewerExpectation: 'Clear explanation of why comparing nums[mid] to nums[right] works (and why comparing to nums[left] is ambiguous for unrotated arrays), loop condition left < right, and convergence on the minimum.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def findMin(self, nums: list[int]) -> int:
        left, right = 0, len(nums) - 1
        while left < right:
            mid = left + (right - left) // 2
            if nums[mid] > nums[right]:
                left = mid + 1
            else:
                right = mid
        return nums[left]`,
        approach: 'Right Boundary Comparison Binary Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>

using namespace std;

class Solution {
public:
    int findMin(vector<int>& nums) {
        int left = 0;
        int right = (int)nums.size() - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return nums[left];
    }
};`,
        approach: 'Iterative Pivot Elimination with Right Boundary',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int findMin(int[] nums) {
        int left = 0;
        int right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return nums[left];
    }
}`,
        approach: 'Right-Referenced Pivot Binary Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return nums[left];
};`,
        approach: 'Right Boundary Pivot Squeeze',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'search-in-rotated-sorted-array',
    number: 33,
    category: 'Algorithms',
    patterns: ['binary-search-rotated'],
    twist_type: 'Sorted Half Interval Inclusion Check',
    method: 'search',
    hints: [
      {
        level: 1,
        title: 'Sorted Sub-interval Identification',
        text: 'Even after rotation, dividing the array at any midpoint leaves at least one of the two halves strictly sorted. How can you test if the target falls within the sorted half?'
      },
      {
        level: 2,
        title: 'Target Inclusion in Sorted Half',
        text: 'If the left half is sorted (nums[left] <= nums[mid]), verify whether the target lies in [nums[left], nums[mid]). If yes, narrow left; otherwise search right. Apply symmetric logic if right is sorted.'
      },
      {
        level: 3,
        title: 'Sorted Half Branching Procedure',
        text: 'Set left = 0 and right = len(nums) - 1. While left <= right, compute mid. If nums[mid] == target, return mid. If nums[left] <= nums[mid], check if nums[left] <= target < nums[mid]; set right = mid - 1 or left = mid + 1. Otherwise check if nums[mid] < target <= nums[right]. Return -1 if not found.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def search(self, nums: list[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] == target:
                return mid
            if nums[left] <= nums[mid]:
                if nums[left] <= target < nums[mid]:
                    right = mid - 1
                else:
                    left = mid + 1
            else:
                if nums[mid] < target <= nums[right]:
                    left = mid + 1
                else:
                    right = mid - 1
        return -1
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(log N)',
      space: 'O(1)',
      variables: ['N: length of nums array (1 <= N <= 5000)'],
      notes: 'Single pass binary search halving the interval based on which half is sorted.',
      whyNaiveFails: 'Linear scan takes O(N) time, violating the explicit O(log N) runtime requirement.',
      spaceTimeTradeoff: 'O(log N) time and O(1) auxiliary space without finding the pivot index first.',
      interviewerExpectation: 'Correctly identifying which half is sorted with <=, boundary comparisons for target inclusion, and handling single-element or unrotated arrays.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] == target:
                return mid
            if nums[left] <= nums[mid]:
                if nums[left] <= target < nums[mid]:
                    right = mid - 1
                else:
                    left = mid + 1
            else:
                if nums[mid] < target <= nums[right]:
                    left = mid + 1
                else:
                    right = mid - 1
        return -1`,
        approach: 'Sorted-Half Interval Decision Binary Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>

using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0;
        int right = (int)nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }
};`,
        approach: 'Direct Binary Search with Sorted Half Disambiguation',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }
}`,
        approach: 'Sorted Sub-Array Inclusion Branching',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (nums[mid] === target) {
            return mid;
        }
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
};`,
        approach: 'Branching on Monotonic Sorted Half',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'reverse-linked-list',
    number: 206,
    category: 'Algorithms',
    patterns: ['linked-list-pointers'],
    twist_type: 'Iterative 3-Pointer Link Reversal',
    method: 'reverseList',
    hints: [
      {
        level: 1,
        title: 'Subsequent Node Reference Preservation',
        text: 'Reversing a link breaks the reference to the subsequent node. What must be retained before modifying the reference of the current node?'
      },
      {
        level: 2,
        title: 'Three Temporary Node References',
        text: 'Store the next node in a temporary reference before redirecting the current node\'s next pointer to the previous node.'
      },
      {
        level: 3,
        title: 'Iterative Link Reversal Procedure',
        text: 'Initialize prev = None and curr = head. While curr is not null, save next_node = curr.next, point curr.next to prev, advance prev = curr, and advance curr = next_node. Return prev as the new head.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        curr = head
        while curr:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node
        return prev
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: number of nodes in the linked list (0 <= N <= 5000)'],
      notes: 'Single pass visiting each node exactly once, updating pointers in-place.',
      whyNaiveFails: 'Collecting all values in an array and creating new nodes takes O(N) extra space and allocates new nodes rather than reversing links in-place.',
      spaceTimeTradeoff: 'Iterative 3-pointer reversal achieves O(N) time and O(1) auxiliary space without recursion stack overhead.',
      interviewerExpectation: 'In-place pointer reversal with O(1) extra space, handling empty list (head == None) and single-node list, clean loop termination.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        curr = head
        while curr:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node
        return prev`,
        approach: 'Iterative Three-Pointer Pointer Reversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr != nullptr) {
            ListNode* nextNode = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextNode;
        }
        return prev;
    }
};`,
        approach: 'Iterative Pointer Rewiring in O(1) Space',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextNode = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextNode;
        }
        return prev;
    }
}`,
        approach: 'Iterative Node Reference Inversion',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let prev = null;
    let curr = head;
    while (curr !== null) {
        const nextNode = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextNode;
    }
    return prev;
};`,
        approach: 'In-Place Pointer Iteration',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'merge-two-sorted-lists',
    number: 21,
    category: 'Algorithms',
    patterns: ['linked-list-pointers'],
    twist_type: 'Sentinel Dummy Node Merging',
    method: 'mergeTwoLists',
    hints: [
      {
        level: 1,
        title: 'Sentinel Head for Merging',
        text: 'How can you build a new sorted sequence by comparing the current heads without creating duplicate nodes?'
      },
      {
        level: 2,
        title: 'Dummy Sentinel Elimination of Edge Cases',
        text: 'A sentinel dummy node avoids conditional logic for setting the initial head of the merged sequence.'
      },
      {
        level: 3,
        title: 'Pointer Rewiring Procedure',
        text: 'Create a dummy node and a tail pointer. While both lists are non-empty, attach the node with the smaller value to tail.next and advance that list. After the loop, append whichever list has remaining nodes. Return dummy.next.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        tail = dummy
        while list1 and list2:
            if list1.val <= list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            tail = tail.next
        tail.next = list1 if list1 else list2
        return dummy.next
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N + M)',
      space: 'O(1)',
      variables: ['N: length of list1 (0 <= N <= 50)', 'M: length of list2 (0 <= M <= 50)'],
      notes: 'In-place pointer rewiring traversing each node at most once.',
      whyNaiveFails: 'Copying elements into an array, sorting them, and re-linking takes O((N + M) log(N + M)) time and O(N + M) space.',
      spaceTimeTradeoff: 'In-place pointer re-wiring takes O(N + M) time and O(1) auxiliary space.',
      interviewerExpectation: 'Use of a dummy head node to simplify pointer manipulation, attaching remaining nodes in O(1) after one list exhausts, and zero node allocations.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        tail = dummy
        while list1 and list2:
            if list1.val <= list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            tail = tail.next
        tail.next = list1 if list1 else list2
        return dummy.next`,
        approach: 'Iterative Merge with Dummy Sentinel Head',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode dummy(0);
        ListNode* tail = &dummy;
        while (list1 != nullptr && list2 != nullptr) {
            if (list1->val <= list2->val) {
                tail->next = list1;
                list1 = list1->next;
            } else {
                tail->next = list2;
                list2 = list2->next;
            }
            tail = tail->next;
        }
        tail->next = (list1 != nullptr) ? list1 : list2;
        return dummy.next;
    }
};`,
        approach: 'Stack-Allocated Sentinel Node with Tail Pointer',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }
        tail.next = (list1 != null) ? list1 : list2;
        return dummy.next;
    }
}`,
        approach: 'Dummy Sentinel with Single-Pass Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    const dummy = new ListNode(0);
    let tail = dummy;
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            tail.next = list1;
            list1 = list1.next;
        } else {
            tail.next = list2;
            list2 = list2.next;
        }
        tail = tail.next;
    }
    tail.next = list1 !== null ? list1 : list2;
    return dummy.next;
};`,
        approach: 'Sentinel Node and Tail Pointer Stitching',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'reorder-list',
    number: 143,
    category: 'Algorithms',
    patterns: ['linked-list-pointers'],
    twist_type: 'Midpoint Split, Reversal, and Alternating Interleave',
    method: 'reorderList',
    hints: [
      {
        level: 1,
        title: 'In-Place List Interleaving',
        text: 'Interleaving nodes from the beginning and end requires access to the second half in reverse order. How can you split and reverse the second half in-place?'
      },
      {
        level: 2,
        title: 'Three Sub-problems Composition',
        text: 'Locate the midpoint using unequal speed traversal, reverse the second half in-place, and alternate merging nodes from both halves.'
      },
      {
        level: 3,
        title: 'Split Reverse Interleave Procedure',
        text: 'Find the list middle. Sever the connection after the middle node to create two separate lists. Reverse the second list in-place. Interleave nodes by alternately splicing one node from the first list and one from the reversed second list.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
        if not head or not head.next:
            return
        slow, fast = head, head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        prev, curr = None, slow.next
        slow.next = None
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
        first, second = head, prev
        while second:
            tmp1, tmp2 = first.next, second.next
            first.next = second
            second.next = tmp1
            first, second = tmp1, tmp2
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: number of nodes in list (1 <= N <= 5 * 10^4)'],
      notes: 'Three sequential linear passes (midpoint, reversal, interleaving) all in O(1) space.',
      whyNaiveFails: 'Storing all nodes in an array takes O(N) space and fails the problem requirement of modifying nodes in-place without node allocation.',
      spaceTimeTradeoff: 'Combining midpoint detection, list reversal, and list interleaving achieves O(N) time with O(1) auxiliary space.',
      interviewerExpectation: 'Breaking the problem into 3 standard subroutines, severing the link between first and second half (prev.next = None), and clean pointer manipulation without cycles.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
        if not head or not head.next:
            return
        slow, fast = head, head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        prev, curr = None, slow.next
        slow.next = None
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
        first, second = head, prev
        while second:
            tmp1, tmp2 = first.next, second.next
            first.next = second
            second.next = tmp1
            first, second = tmp1, tmp2`,
        approach: 'Midpoint Tortoise-Hare, Reverse Half, and In-Place Weave',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    void reorderList(ListNode* head) {
        if (!head || !head->next) return;
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
        }
        ListNode* prev = nullptr;
        ListNode* curr = slow->next;
        slow->next = nullptr;
        while (curr != nullptr) {
            ListNode* nxt = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nxt;
        }
        ListNode* first = head;
        ListNode* second = prev;
        while (second != nullptr) {
            ListNode* tmp1 = first->next;
            ListNode* tmp2 = second->next;
            first->next = second;
            second->next = tmp1;
            first = tmp1;
            second = tmp2;
        }
    }
};`,
        approach: 'Three Subroutines In-Place Pointer Rewiring',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public void reorderList(ListNode head) {
        if (head == null || head.next == null) return;
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode prev = null;
        ListNode curr = slow.next;
        slow.next = null;
        while (curr != null) {
            ListNode nxt = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nxt;
        }
        ListNode first = head;
        ListNode second = prev;
        while (second != null) {
            ListNode tmp1 = first.next;
            ListNode tmp2 = second.next;
            first.next = second;
            second.next = tmp1;
            first = tmp1;
            second = tmp2;
        }
    }
}`,
        approach: 'Midpoint Discovery, Half Reversal, and Alternating Splicing',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {ListNode} head
 * @return {void}
 */
var reorderList = function(head) {
    if (!head || !head.next) return;
    let slow = head;
    let fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    let prev = null;
    let curr = slow.next;
    slow.next = null;
    while (curr !== null) {
        const nxt = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nxt;
    }
    let first = head;
    let second = prev;
    while (second !== null) {
        const tmp1 = first.next;
        const tmp2 = second.next;
        first.next = second;
        second.next = tmp1;
        first = tmp1;
        second = tmp2;
    }
};`,
        approach: 'In-Place Disconnection, Reversal, and Merge',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'remove-nth-node-from-end-of-list',
    number: 19,
    category: 'Algorithms',
    patterns: ['linked-list-pointers'],
    twist_type: 'Two Pointers Fixed Gap Traversal with Dummy Head',
    method: 'removeNthFromEnd',
    hints: [
      {
        level: 1,
        title: 'Fixed Gap Traversal',
        text: 'Removing the nth node from the end requires knowing the node immediately preceding it. How can advancing ahead by n nodes locate this position in a single traversal?'
      },
      {
        level: 2,
        title: 'Leader and Follower Distance Invariant',
        text: 'If the leader advances n steps ahead of the follower, when the leader reaches the end, the follower sits immediately before the target node to delete.'
      },
      {
        level: 3,
        title: 'Dummy Head Gap Procedure',
        text: 'Attach a dummy sentinel node before head. Position leader and follower at dummy. Advance leader by n + 1 steps. Move both pointers in lockstep until leader reaches null. Update follower.next = follower.next.next to bypass the target. Return dummy.next.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        fast = slow = dummy
        for _ in range(n + 1):
            fast = fast.next
        while fast:
            fast = fast.next
            slow = slow.next
        slow.next = slow.next.next
        return dummy.next
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: number of nodes in list (1 <= N <= 30)'],
      notes: 'Single pass using two pointers maintained at distance n + 1.',
      whyNaiveFails: 'A two-pass approach that counts length and traverses again takes two passes. While O(N), single-pass is the expected interview standard.',
      spaceTimeTradeoff: 'Two pointers maintain a fixed gap of n nodes to achieve single-pass O(N) time and O(1) auxiliary space.',
      interviewerExpectation: 'Using a dummy node to cleanly handle removing the head node (n == length), single traversal pass, and proper pointer unlinking.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        fast = slow = dummy
        for _ in range(n + 1):
            fast = fast.next
        while fast:
            fast = fast.next
            slow = slow.next
        slow.next = slow.next.next
        return dummy.next`,
        approach: 'One-Pass Two Pointers with Dummy Sentinel Head',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode dummy(0, head);
        ListNode* fast = &dummy;
        ListNode* slow = &dummy;
        for (int i = 0; i <= n; i++) {
            fast = fast->next;
        }
        while (fast != nullptr) {
            fast = fast->next;
            slow = slow->next;
        }
        slow->next = slow->next->next;
        return dummy.next;
    }
};`,
        approach: 'Stack-Allocated Sentinel with Fast/Slow Gap Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head);
        ListNode fast = dummy;
        ListNode slow = dummy;
        for (int i = 0; i <= n; i++) {
            fast = fast.next;
        }
        while (fast != null) {
            fast = fast.next;
            slow = slow.next;
        }
        slow.next = slow.next.next;
        return dummy.next;
    }
}`,
        approach: 'Fixed Gap Two Pointers with Sentinel Head',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    const dummy = new ListNode(0, head);
    let fast = dummy;
    let slow = dummy;
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }
    while (fast !== null) {
        fast = fast.next;
        slow = slow.next;
    }
    slow.next = slow.next.next;
    return dummy.next;
};`,
        approach: 'Two Pointer Gap with Dummy Node',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'linked-list-cycle',
    number: 141,
    category: 'Algorithms',
    patterns: ['two-pointers-fast-slow'],
    twist_type: 'Floyd Tortoise and Hare Cycle Detection',
    method: 'hasCycle',
    hints: [
      {
        level: 1,
        title: 'Cycle Detection Without Extra Space',
        text: 'Visiting nodes indefinitely without an end implies a loop. How can you detect this without storing visited node references in extra space?'
      },
      {
        level: 2,
        title: 'Relative Speed Catch-up Invariant',
        text: 'If two runners traverse at different speeds (one step versus two steps per tick), the faster runner closes the gap by one node each step and must meet the slower runner inside any loop.'
      },
      {
        level: 3,
        title: 'Tortoise and Hare Traversal',
        text: 'Initialize slow = head and fast = head. While fast and fast.next are not null, advance slow by 1 step and fast by 2 steps. If slow and fast point to the same node, return true. If fast reaches null, return false.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        slow = head
        fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                return True
        return False
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: number of nodes in list (0 <= N <= 10^4)'],
      notes: 'Floyd cycle finding traverses at most N + K steps where K is cycle length.',
      whyNaiveFails: 'Storing visited node references in a set takes O(N) extra space. The follow-up specifically asks for O(1) auxiliary space.',
      spaceTimeTradeoff: 'Floyd\'s Tortoise and Hare algorithm achieves O(N) time with O(1) auxiliary space.',
      interviewerExpectation: 'Checking fast and fast.next for null before advancing, understanding that the relative speed is 1 node per iteration guaranteeing collision within cycle length, and O(1) space.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        slow = head
        fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                return True
        return False`,
        approach: 'Floyd Tortoise and Hare Cycle Finding',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    bool hasCycle(ListNode *head) {
        ListNode *slow = head;
        ListNode *fast = head;
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) {
                return true;
            }
        }
        return false;
    }
};`,
        approach: 'Two Pointers Collision Detection',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                return true;
            }
        }
        return false;
    }
}`,
        approach: 'Fast and Slow Pointer Cycle Detection',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    let slow = head;
    let fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            return true;
        }
    }
    return false;
};`,
        approach: 'Floyd Cycle Detection',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'lru-cache',
    number: 146,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    twist_type: 'Doubly Linked List with Hash Map Sentinel Design',
    method: 'LRUCache',
    hints: [
      {
        level: 1,
        title: 'Constant Time Eviction and Lookup',
        text: 'How can you look up values by key in constant time while also tracking the order of usage for constant-time eviction?'
      },
      {
        level: 2,
        title: 'Dual Structure Composition',
        text: 'A key lookup collection provides constant-time access, and a doubly linked node chain provides constant-time node removal and front insertion.'
      },
      {
        level: 3,
        title: 'Sentinel Doubly Linked Cache Procedure',
        text: 'Maintain key-to-node mapping and a doubly linked chain with dummy head and tail sentinels. On get, if present, move the node to front and return its value; else -1. On put, update existing node and move to front; else create node, insert at front, and if capacity exceeded, remove node before tail and delete its key.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Node:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {}
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node: Node) -> None:
        p = node.prev
        n = node.next
        p.next = n
        n.prev = p

    def _add_to_front(self, node: Node) -> None:
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add_to_front(node)
            return node.val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            node.val = value
            self._add_to_front(node)
        else:
            if len(self.cache) >= self.cap:
                lru = self.tail.prev
                self._remove(lru)
                del self.cache[lru.key]
            new_node = Node(key, value)
            self.cache[key] = new_node
            self._add_to_front(new_node)
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(capacity)',
      variables: ['capacity: maximum cache size (1 <= capacity <= 3000)', 'operations: up to 2 * 10^5 get and put calls'],
      notes: 'Both get and put run in strictly O(1) time using pointer updates in doubly linked list.',
      whyNaiveFails: 'Using an array or list to track timestamps requires O(N) time to find or remove elements on each access, leading to TLE on large operation sequences.',
      spaceTimeTradeoff: 'Doubly linked list node pointers paired with a hash table achieve strictly O(1) time for both operations using O(capacity) auxiliary space.',
      interviewerExpectation: 'Sentinel dummy head and tail nodes to avoid null-checking edge cases during node removal and insertion, clean helper functions _remove and _add_to_front, correct eviction of the least recently used key.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Node:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {}
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node: Node) -> None:
        p = node.prev
        n = node.next
        p.next = n
        n.prev = p

    def _add_to_front(self, node: Node) -> None:
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add_to_front(node)
            return node.val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            node.val = value
            self._add_to_front(node)
        else:
            if len(self.cache) >= self.cap:
                lru = self.tail.prev
                self._remove(lru)
                del self.cache[lru.key]
            new_node = Node(key, value)
            self.cache[key] = new_node
            self._add_to_front(new_node)`,
        approach: 'Hash Map + Doubly Linked List with Sentinel Head and Tail',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <unordered_map>

using namespace std;

class LRUCache {
private:
    struct Node {
        int key;
        int val;
        Node* prev;
        Node* next;
        Node(int k = 0, int v = 0) : key(k), val(v), prev(nullptr), next(nullptr) {}
    };

    int cap;
    unordered_map<int, Node*> cache;
    Node* head;
    Node* tail;

    void remove(Node* node) {
        Node* p = node->prev;
        Node* n = node->next;
        p->next = n;
        n->prev = p;
    }

    void addToFront(Node* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }

public:
    LRUCache(int capacity) : cap(capacity) {
        head = new Node();
        tail = new Node();
        head->next = tail;
        tail->prev = head;
    }

    int get(int key) {
        if (cache.count(key)) {
            Node* node = cache[key];
            remove(node);
            addToFront(node);
            return node->val;
        }
        return -1;
    }

    void put(int key, int value) {
        if (cache.count(key)) {
            Node* node = cache[key];
            remove(node);
            node->val = value;
            addToFront(node);
        } else {
            if ((int)cache.size() >= cap) {
                Node* lru = tail->prev;
                remove(lru);
                cache.erase(lru->key);
                delete lru;
            }
            Node* newNode = new Node(key, value);
            cache[key] = newNode;
            addToFront(newNode);
        }
    }
};`,
        approach: 'Unordered Map with Doubly Linked Sentinel Nodes',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.HashMap;
import java.util.Map;

class LRUCache {
    private static class Node {
        int key;
        int val;
        Node prev;
        Node next;
        Node(int k, int v) {
            this.key = k;
            this.val = v;
        }
    }

    private final int cap;
    private final Map<Integer, Node> cache;
    private final Node head;
    private final Node tail;

    public LRUCache(int capacity) {
        this.cap = capacity;
        this.cache = new HashMap<>();
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    private void remove(Node node) {
        Node p = node.prev;
        Node n = node.next;
        p.next = n;
        n.prev = p;
    }

    private void addToFront(Node node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }

    public int get(int key) {
        if (cache.containsKey(key)) {
            Node node = cache.get(key);
            remove(node);
            addToFront(node);
            return node.val;
        }
        return -1;
    }

    public void put(int key, int value) {
        if (cache.containsKey(key)) {
            Node node = cache.get(key);
            remove(node);
            node.val = value;
            addToFront(node);
        } else {
            if (cache.size() >= cap) {
                Node lru = tail.prev;
                remove(lru);
                cache.remove(lru.key);
            }
            Node newNode = new Node(key, value);
            cache.put(key, newNode);
            addToFront(newNode);
        }
    }
}`,
        approach: 'HashMap and Doubly Linked List with Head/Tail Sentinels',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.cap = capacity;
    this.cache = new Map();
    this.head = { key: 0, val: 0, prev: null, next: null };
    this.tail = { key: 0, val: 0, prev: null, next: null };
    this.head.next = this.tail;
    this.tail.prev = this.head;
};

LRUCache.prototype._remove = function(node) {
    const p = node.prev;
    const n = node.next;
    p.next = n;
    n.prev = p;
};

LRUCache.prototype._addToFront = function(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (this.cache.has(key)) {
        const node = this.cache.get(key);
        this._remove(node);
        this._addToFront(node);
        return node.val;
    }
    return -1;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if (this.cache.has(key)) {
        const node = this.cache.get(key);
        this._remove(node);
        node.val = value;
        this._addToFront(node);
    } else {
        if (this.cache.size >= this.cap) {
            const lru = this.tail.prev;
            this._remove(lru);
            this.cache.delete(lru.key);
        }
        const newNode = { key, val: value, prev: null, next: null };
        this.cache.set(key, newNode);
        this._addToFront(newNode);
    }
};`,
        approach: 'Map with Doubly Linked Sentinel Objects',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  }
];

export function writeBatch2() {
  const problemsDir = path.join(rootDir, 'dataset', 'problems');
  const testsDir = path.join(rootDir, 'dataset', 'tests');

  for (const prob of BATCH2_PROBLEMS) {
    const probFile = path.join(problemsDir, `${prob.slug}.json`);
    const problemData = {
      slug: prob.slug,
      number: prob.number,
      category: prob.category,
      patterns: prob.patterns,
      hints: prob.hints,
      complexity: prob.complexity,
      solutions: prob.solutions,
      review: {
        status: 'tested',
        acceptedOnLeetCode: null,
        reviewer: null
      },
      updated: '2026-10-18T00:00:00.000Z'
    };

    fs.writeFileSync(probFile, JSON.stringify(problemData, null, 2) + '\n', 'utf8');
    console.log(`✓ Wrote dataset/problems/${prob.slug}.json`);

    // Ensure tests directory exists
    const testDir = path.join(testsDir, prob.slug);
    fs.mkdirSync(testDir, { recursive: true });

    // Write meta.json
    const meta = {
      slug: prob.slug,
      entrypoint: 'test.py',
      comparator: 'exact',
      method: prob.method,
      reference: `Independent algorithmic reference test for ${prob.slug}`
    };
    fs.writeFileSync(path.join(testDir, 'meta.json'), JSON.stringify(meta, null, 2) + '\n', 'utf8');
  }

  console.log(`✓ Successfully populated ${BATCH2_PROBLEMS.length} problem files and meta.json test configs`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  writeBatch2();
}
