import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const problemsDir = path.resolve(__dirname, '../problems');

const updates = {
  // ==========================================
  // 10 ALGORITHMS PROBLEMS
  // ==========================================
  'two-sum': {
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: length of nums array (2 <= N <= 10^4)'],
      notes: 'Single pass over nums with O(1) average hash table lookups and insertions.',
      whyNaiveFails: 'Checking every pair costs O(N^2) time. For N = 10^4, this requires up to (10^4 * (10^4 - 1)) / 2 = ~5 * 10^7 operations, which is too slow and approaches the 1-second timeout limit on large arrays, while missing the hash map invariant.',
      spaceTimeTradeoff: 'Trading O(N) auxiliary space in a hash map to store previously seen numbers reduces time from O(N^2) brute force to O(N) single-pass lookup.',
      interviewerExpectation: 'Immediate identification of the one-pass complement lookup, handling duplicate numbers correctly (e.g. [3, 3] target 6), returning indices rather than values, and avoiding using the same element twice.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`,
        approach: 'One-Pass Hash Map Complement Lookup',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>
#include <unordered_map>

using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < (int)nums.size(); ++i) {
            int complement = target - nums[i];
            auto it = seen.find(complement);
            if (it != seen.end()) {
                return {it->second, i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
        approach: 'One-Pass Unordered Map Lookup',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.Map;
import java.util.HashMap;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[]{seen.get(complement), i};
            }
            seen.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
        approach: 'One-Pass HashMap Complement Lookup',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return [];
};`,
        approach: 'One-Pass Map Complement Lookup',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  'maximum-subarray': {
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: length of nums array (1 <= N <= 10^5)'],
      notes: 'Single linear pass tracking running maximum with constant auxiliary memory.',
      whyNaiveFails: 'Evaluating every contiguous subarray (i, j) takes O(N^2) time. For N = 10^5, this requires ~5 * 10^9 operations, exceeding the ~10^8 per-second CPU budget by a factor of 50 and causing Time Limit Exceeded.',
      spaceTimeTradeoff: "O(1) auxiliary space suffices because Kadane's algorithm only depends on the previous prefix sum (current_sum = max(num, current_sum + num)), requiring zero extra memory beyond two scalar registers.",
      interviewerExpectation: "Handling all-negative input arrays correctly (returning the single maximum negative value rather than 0), recognizing Kadane's greedy/DP invariant, and understanding the divide-and-conquer O(N log N) alternative."
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        current_max = max_so_far = nums[0]
        for x in nums[1:]:
            current_max = max(x, current_max + x)
            max_so_far = max(max_so_far, current_max)
        return max_so_far`,
        approach: "Kadane's Algorithm (Linear Prefix Reset)",
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
    int maxSubArray(vector<int>& nums) {
        int currentMax = nums[0];
        int maxSoFar = nums[0];
        for (size_t i = 1; i < nums.size(); ++i) {
            currentMax = max(nums[i], currentMax + nums[i]);
            maxSoFar = max(maxSoFar, currentMax);
        }
        return maxSoFar;
    }
};`,
        approach: "Kadane's Algorithm (Linear Scan)",
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int maxSubArray(int[] nums) {
        int currentMax = nums[0];
        int maxSoFar = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentMax = Math.max(nums[i], currentMax + nums[i]);
            maxSoFar = Math.max(maxSoFar, currentMax);
        }
        return maxSoFar;
    }
}`,
        approach: "Kadane's Algorithm (Constant Space DP)",
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let currentMax = nums[0];
    let maxSoFar = nums[0];
    for (let i = 1; i < nums.length; i++) {
        currentMax = Math.max(nums[i], currentMax + nums[i]);
        maxSoFar = Math.max(maxSoFar, currentMax);
    }
    return maxSoFar;
};`,
        approach: "Kadane's Dynamic Programming",
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  'valid-parentheses': {
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: length of string s (1 <= N <= 10^4)'],
      notes: 'Single pass pushing and popping each character from stack at most once.',
      whyNaiveFails: "Repeatedly searching for and replacing adjacent pairs '()', '{}', '[]' with string replace/regex operations takes O(N^2) time and allocates new string buffers on each scan. For N = 10^4, this requires up to ~5 * 10^7 character copies, creating unnecessary GC pressure and quadratic latency.",
      spaceTimeTradeoff: 'Allocating an explicit LIFO stack of up to O(N) auxiliary characters enables a single deterministic linear pass (O(N) time) by immediately validating and popping the most recent unclosed bracket.',
      interviewerExpectation: 'Handling edge cases cleanly: odd length strings (immediate false), premature closing brackets with an empty stack, mismatched bracket kinds, and leftover unclosed brackets at end-of-string.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def isValid(self, s: str) -> bool:
        mapping = {')': '(', '}': '{', ']': '['}
        stack = []
        for char in s:
            if char in mapping:
                if not stack or stack[-1] != mapping[char]:
                    return False
                stack.pop()
            else:
                stack.append(char)
        return len(stack) == 0`,
        approach: 'LIFO Stack Matching with Delimiter Mapping',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <string>
#include <stack>

using namespace std;

class Solution {
public:
    bool isValid(string s) {
        if (s.size() % 2 != 0) return false;
        stack<char> st;
        for (char c : s) {
            if (c == '(') st.push(')');
            else if (c == '{') st.push('}');
            else if (c == '[') st.push(']');
            else {
                if (st.empty() || st.top() != c) return false;
                st.pop();
            }
        }
        return st.empty();
    }
};`,
        approach: 'LIFO Stack with Matching Inversion',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.Deque;
import java.util.ArrayDeque;

class Solution {
    public boolean isValid(String s) {
        if (s.length() % 2 != 0) return false;
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else {
                if (stack.isEmpty() || stack.pop() != c) return false;
            }
        }
        return stack.isEmpty();
    }
}`,
        approach: 'ArrayDeque LIFO Character Validation',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if (s.length % 2 !== 0) return false;
    const mapping = { ')': '(', '}': '{', ']': '[' };
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (mapping[char]) {
            if (stack.length === 0 || stack[stack.length - 1] !== mapping[char]) {
                return false;
            }
            stack.pop();
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
};`,
        approach: 'Array Stack Linear Validation',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  'daily-temperatures': {
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: length of temperatures array (N <= 10^5)'],
      notes: 'Monotonic decreasing stack where each index is pushed and popped at most once.',
      whyNaiveFails: 'For each day i, scanning forward for the first day j > i with T[j] > T[i] requires O(N^2) time in the worst case (e.g. monotonically non-increasing temperatures like [100, 99, 98, ...]). For N = 10^5, this requires (10^5)^2 / 2 = 5 * 10^9 inner loop comparisons, exceeding the 1-second timeout by 50x.',
      spaceTimeTradeoff: 'Storing up to O(N) unresolved day indices in a monotonic decreasing stack guarantees each index is pushed and popped at most once, reducing aggregate time from O(N^2) to amortized O(N).',
      interviewerExpectation: 'Storing indices instead of temperature values on the stack so index deltas (i - prev) can be written directly to the output array; leaving 0 for temperatures that are never exceeded.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:
        n = len(temperatures)
        res = [0] * n
        stack = []

        for i, t in enumerate(temperatures):
            while stack and t > temperatures[stack[-1]]:
                prev_idx = stack.pop()
                res[prev_idx] = i - prev_idx
            stack.append(i)

        return res`,
        approach: 'Index Distance instead of Value (Monotonic Decreasing Stack)',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>
#include <stack>

using namespace std;

class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        vector<int> res(n, 0);
        stack<int> st;
        for (int i = 0; i < n; ++i) {
            while (!st.empty() && temperatures[i] > temperatures[st.top()]) {
                int prevIdx = st.top();
                st.pop();
                res[prevIdx] = i - prevIdx;
            }
            st.push(i);
        }
        return res;
    }
};`,
        approach: 'Monotonic Decreasing Stack of Indices',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.Deque;
import java.util.ArrayDeque;

class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] res = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int prevIdx = stack.pop();
                res[prevIdx] = i - prevIdx;
            }
            stack.push(i);
        }
        return res;
    }
}`,
        approach: 'ArrayDeque Monotonic Index Resolution',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function(temperatures) {
    const n = temperatures.length;
    const res = new Array(n).fill(0);
    const stack = [];
    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const prevIdx = stack.pop();
            res[prevIdx] = i - prevIdx;
        }
        stack.push(i);
    }
    return res;
};`,
        approach: 'Monotonic Decreasing Stack Scan',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  'burst-balloons': {
    complexity: {
      kind: 'big-o',
      time: 'O(N^3)',
      space: 'O(N^2)',
      variables: ['N: number of balloons (N <= 300)'],
      notes: 'Interval DP iterating over all sub-ranges and last popped balloon k.',
      whyNaiveFails: 'Choosing balloons in forward order means bursting balloon i couples its left and right neighbors across all future choices, destroying optimal substructure. A brute-force search over all N! permutations for N = 300 requires 300! ≈ 3 * 10^614 operations, which is completely intractable.',
      spaceTimeTradeoff: 'Allocating an O(N^2) dynamic programming table (dp[i][j] for all intervals (i, j)) enables solving the inverted problem (choosing the LAST balloon to burst) in O(N^3) operations by decoupling the subproblems.',
      interviewerExpectation: 'Explaining clearly why forward DP fails (neighbor dependency) and why reverse DP works (last balloon burst maintains fixed boundary neighbors nums[left] and nums[right]); padding array with boundary 1s.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def maxCoins(self, nums: list[int]) -> int:
        nums = [1] + [x for x in nums if x > 0] + [1]
        n = len(nums)
        dp = [[0] * n for _ in range(n)]

        for length in range(2, n):
            for left in range(n - length):
                right = left + length
                for k in range(left + 1, right):
                    coins = dp[left][k] + dp[k][right] + nums[left] * nums[k] * nums[right]
                    if coins > dp[left][right]:
                        dp[left][right] = coins

        return dp[0][n - 1]`,
        approach: 'Reverse Order Thinking (Choose LAST burst balloon in interval)',
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
    int maxCoins(vector<int>& nums) {
        vector<int> vals;
        vals.push_back(1);
        for (int x : nums) {
            if (x > 0) vals.push_back(x);
        }
        vals.push_back(1);
        int n = vals.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));

        for (int len = 2; len < n; ++len) {
            for (int left = 0; left < n - len; ++left) {
                int right = left + len;
                for (int k = left + 1; k < right; ++k) {
                    int coins = dp[left][k] + dp[k][right] + vals[left] * vals[k] * vals[right];
                    if (coins > dp[left][right]) {
                        dp[left][right] = coins;
                    }
                }
            }
        }
        return dp[0][n - 1];
    }
};`,
        approach: 'Interval Dynamic Programming (Inverted Last-Popped Selection)',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int maxCoins(int[] nums) {
        int[] vals = new int[nums.length + 2];
        int n = 1;
        vals[0] = 1;
        for (int x : nums) {
            if (x > 0) vals[n++] = x;
        }
        vals[n++] = 1;

        int[][] dp = new int[n][n];
        for (int len = 2; len < n; ++len) {
            for (int left = 0; left < n - len; ++left) {
                int right = left + len;
                for (int k = left + 1; k < right; ++k) {
                    int coins = dp[left][k] + dp[k][right] + vals[left] * vals[k] * vals[right];
                    if (coins > dp[left][right]) {
                        dp[left][right] = coins;
                    }
                }
            }
        }
        return dp[0][n - 1];
    }
}`,
        approach: 'Interval DP with Boundary Padding',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function(nums) {
    const vals = [1, ...nums.filter(x => x > 0), 1];
    const n = vals.length;
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));

    for (let len = 2; len < n; len++) {
        for (let left = 0; left < n - len; left++) {
            const right = left + len;
            for (let k = left + 1; k < right; k++) {
                const coins = dp[left][k] + dp[k][right] + vals[left] * vals[k] * vals[right];
                if (coins > dp[left][right]) {
                    dp[left][right] = coins;
                }
            }
        }
    }
    return dp[0][n - 1];
};`,
        approach: 'Interval DP (Choose Last Balloon in Interval)',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  'cheapest-flights-within-k-stops': {
    complexity: {
      kind: 'big-o',
      time: 'O(K * E)',
      space: 'O(V)',
      variables: [
        'V: number of cities (n <= 100)',
        'E: number of flights',
        'K: maximum stops (k <= 100)'
      ],
      notes: 'Bellman-Ford relaxation across at most K + 1 edge rounds.',
      whyNaiveFails: 'Standard Dijkstra only records the cheapest distance to each node, prematurely discarding a pricier path that reaches a node in fewer stops. Backtracking all paths recursively takes exponential O(V^(K+1)) time, which exceeds 100^100 operations and triggers severe Time Limit Exceeded.',
      spaceTimeTradeoff: 'Maintaining two arrays of size O(V) (dist and temp snapshot) prevents cascading updates within a single step and guarantees O(K * E) time across at most K + 1 rounds with O(V) auxiliary memory.',
      interviewerExpectation: 'Explaining why a temporary distance snapshot is strictly necessary (to prevent taking multiple flights in a single round); properly returning -1 when destination is unreachable.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def findCheapestPrice(self, n: int, flights: list[list[int]], src: int, dst: int, k: int) -> int:
        dist = [float('inf')] * n
        dist[src] = 0

        for _ in range(k + 1):
            temp = list(dist)
            for u, v, price in flights:
                if dist[u] != float('inf') and dist[u] + price < temp[v]:
                    temp[v] = dist[u] + price
            dist = temp

        return dist[dst] if dist[dst] != float('inf') else -1`,
        approach: 'Bounded Edge Count (Bellman-Ford / DP state expansion)',
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
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        const int INF = 1e9;
        vector<int> dist(n, INF);
        dist[src] = 0;

        for (int i = 0; i <= k; ++i) {
            vector<int> temp = dist;
            for (const auto& f : flights) {
                int u = f[0], v = f[1], price = f[2];
                if (dist[u] != INF && dist[u] + price < temp[v]) {
                    temp[v] = dist[u] + price;
                }
            }
            dist = temp;
        }

        return dist[dst] == INF ? -1 : dist[dst];
    }
};`,
        approach: 'Bellman-Ford with Layer Snapshotting',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.Arrays;

class Solution {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;

        for (int i = 0; i <= k; i++) {
            int[] temp = Arrays.copyOf(dist, n);
            for (int[] f : flights) {
                int u = f[0], v = f[1], price = f[2];
                if (dist[u] != Integer.MAX_VALUE && dist[u] + price < temp[v]) {
                    temp[v] = dist[u] + price;
                }
            }
            dist = temp;
        }

        return dist[dst] == Integer.MAX_VALUE ? -1 : dist[dst];
    }
}`,
        approach: 'Bounded Step Relaxation (Bellman-Ford)',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function(n, flights, src, dst, k) {
    let dist = new Array(n).fill(Infinity);
    dist[src] = 0;

    for (let i = 0; i <= k; i++) {
        const temp = [...dist];
        for (const [u, v, price] of flights) {
            if (dist[u] !== Infinity && dist[u] + price < temp[v]) {
                temp[v] = dist[u] + price;
            }
        }
        dist = temp;
    }

    return dist[dst] === Infinity ? -1 : dist[dst];
};`,
        approach: 'Layered Edge Relaxation (Bellman-Ford)',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  'shortest-path-visiting-all-nodes': {
    complexity: {
      kind: 'big-o',
      time: 'O(N^2 * 2^N)',
      space: 'O(N * 2^N)',
      variables: ['N: number of nodes (N <= 12)'],
      notes: 'Breadth-first search on state graph (current_node, visited_bitmask).',
      whyNaiveFails: 'Standard BFS with a 1D visited array terminates prematurely because reaching all nodes in a general graph (e.g. tree or line graph) requires backtracking across already visited vertices. Naive unconstrained search enters infinite cycles or explores up to N! ≈ 4.79 * 10^8 paths, exhausting memory and time limits.',
      spaceTimeTradeoff: 'Expanding the state space to (node, mask) uses O(N * 2^N) auxiliary space (at most 12 * 4096 = 49,152 states) to enable an unweighted BFS that guarantees the first state with mask = (1 << N) - 1 is the global shortest path in O(N^2 * 2^N) time.',
      interviewerExpectation: 'Multi-source initialization (enqueuing all N starting nodes simultaneously at distance 0); using bitwise operations (mask | (1 << neighbor)) for O(1) state transitions; recognizing that unweighted shortest path guarantees optimality upon reaching full mask.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from collections import deque

class Solution:
    def shortestPathLength(self, graph: list[list[int]]) -> int:
        n = len(graph)
        target = (1 << n) - 1
        queue = deque([(i, 1 << i, 0) for i in range(n)])
        visited = set([(i, 1 << i) for i in range(n)])

        while queue:
            node, mask, dist = queue.popleft()
            if mask == target:
                return dist
            for neighbor in graph[node]:
                next_mask = mask | (1 << neighbor)
                if (neighbor, next_mask) not in visited:
                    visited.add((neighbor, next_mask))
                    queue.append((neighbor, next_mask, dist + 1))
        return 0`,
        approach: 'State Bitmask BFS (Node revisiting allowed)',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>
#include <queue>
#include <tuple>

using namespace std;

class Solution {
public:
    int shortestPathLength(vector<vector<int>>& graph) {
        int n = graph.size();
        int target = (1 << n) - 1;
        queue<tuple<int, int, int>> q;
        vector<vector<bool>> visited(n, vector<bool>(1 << n, false));

        for (int i = 0; i < n; ++i) {
            q.push({i, 1 << i, 0});
            visited[i][1 << i] = true;
        }

        while (!q.empty()) {
            auto [node, mask, dist] = q.front();
            q.pop();

            if (mask == target) return dist;

            for (int neighbor : graph[node]) {
                int nextMask = mask | (1 << neighbor);
                if (!visited[neighbor][nextMask]) {
                    visited[neighbor][nextMask] = true;
                    q.push({neighbor, nextMask, dist + 1});
                }
            }
        }
        return 0;
    }
};`,
        approach: 'Multi-Source State Bitmask BFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.Queue;
import java.util.ArrayDeque;

class Solution {
    public int shortestPathLength(int[][] graph) {
        int n = graph.length;
        int target = (1 << n) - 1;
        Queue<int[]> queue = new ArrayDeque<>();
        boolean[][] visited = new boolean[n][1 << n];

        for (int i = 0; i < n; i++) {
            queue.offer(new int[]{i, 1 << i, 0});
            visited[i][1 << i] = true;
        }

        while (!queue.isEmpty()) {
            int[] curr = queue.poll();
            int node = curr[0], mask = curr[1], dist = curr[2];

            if (mask == target) return dist;

            for (int neighbor : graph[node]) {
                int nextMask = mask | (1 << neighbor);
                if (!visited[neighbor][nextMask]) {
                    visited[neighbor][nextMask] = true;
                    queue.offer(new int[]{neighbor, nextMask, dist + 1});
                }
            }
        }
        return 0;
    }
}`,
        approach: 'State BFS over (Node, Bitmask) Graph',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[][]} graph
 * @return {number}
 */
var shortestPathLength = function(graph) {
    const n = graph.length;
    const target = (1 << n) - 1;
    const queue = [];
    const visited = Array.from({ length: n }, () => new Uint8Array(1 << n));

    for (let i = 0; i < n; i++) {
        queue.push([i, 1 << i, 0]);
        visited[i][1 << i] = 1;
    }

    let head = 0;
    while (head < queue.length) {
        const [node, mask, dist] = queue[head++];
        if (mask === target) return dist;

        for (const neighbor of graph[node]) {
            const nextMask = mask | (1 << neighbor);
            if (!visited[neighbor][nextMask]) {
                visited[neighbor][nextMask] = 1;
                queue.push([neighbor, nextMask, dist + 1]);
            }
        }
    }
    return 0;
};`,
        approach: 'Bitmask BFS with Fast Uint8Array Table',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  'sum-of-distances-in-tree': {
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of nodes (N <= 3 * 10^4)'],
      notes: 'Two-pass tree rerooting using iterative BFS ordering to support arbitrary tree depths without recursion limits.',
      whyNaiveFails: 'Running an independent BFS or DFS traversal from every single node takes O(N^2) time. For N = 3 * 10^4, this requires (3 * 10^4)^2 = 9 * 10^8 operations, exceeding the 1-second timeout by an order of magnitude and risking deep recursion call stack overflow on skewed tree paths.',
      spaceTimeTradeoff: 'Storing O(N) auxiliary tree metadata (count[u] subtree node counts and ans[u] running distances) across two linear passes (O(N) time) computes all N tree distance sums with zero redundant traversals.',
      interviewerExpectation: 'Deriving the rerooting transition formula ans[v] = ans[u] - count[v] + (n - count[v]) from first principles (moving root to child v brings its count[v] subtree nodes 1 step closer and moves the remaining n - count[v] nodes 1 step farther).'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from collections import deque

class Solution:
    def sumOfDistancesInTree(self, n: int, edges: list[list[int]]) -> list[int]:
        if n <= 1:
            return [0]

        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        parent = [-1] * n
        order = []
        visited = [False] * n
        visited[0] = True
        queue = deque([0])

        while queue:
            u = queue.popleft()
            order.append(u)
            for v in adj[u]:
                if not visited[v]:
                    visited[v] = True
                    parent[v] = u
                    queue.append(v)

        count = [1] * n
        ans = [0] * n

        for u in reversed(order[1:]):
            p = parent[u]
            count[p] += count[u]
            ans[p] += ans[u] + count[u]

        for u in order[1:]:
            p = parent[u]
            ans[u] = ans[p] - count[u] + (n - count[u])

        return ans`,
        approach: '2-Pass Iterative Tree Rerooting DP (Zero-Recursion BFS Topological Order)',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>
#include <queue>

using namespace std;

class Solution {
public:
    vector<int> sumOfDistancesInTree(int n, vector<vector<int>>& edges) {
        if (n <= 1) return {0};

        vector<vector<int>> adj(n);
        for (const auto& e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        vector<int> parent(n, -1);
        vector<int> order;
        order.reserve(n);
        vector<bool> visited(n, false);
        visited[0] = true;
        queue<int> q;
        q.push(0);

        while (!q.empty()) {
            int u = q.front();
            q.pop();
            order.push_back(u);
            for (int v : adj[u]) {
                if (!visited[v]) {
                    visited[v] = true;
                    parent[v] = u;
                    q.push(v);
                }
            }
        }

        vector<int> count(n, 1);
        vector<int> ans(n, 0);

        for (int i = n - 1; i > 0; --i) {
            int u = order[i];
            int p = parent[u];
            count[p] += count[u];
            ans[p] += ans[u] + count[u];
        }

        for (int i = 1; i < n; ++i) {
            int u = order[i];
            int p = parent[u];
            ans[u] = ans[p] - count[u] + (n - count[u]);
        }

        return ans;
    }
};`,
        approach: 'Iterative 2-Pass BFS Rerooting Tree DP',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Queue;
import java.util.ArrayDeque;

class Solution {
    public int[] sumOfDistancesInTree(int n, int[][] edges) {
        if (n <= 1) return new int[]{0};

        List<List<Integer>> adj = new ArrayList<>(n);
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }

        int[] parent = new int[n];
        Arrays.fill(parent, -1);
        int[] order = new int[n];
        int orderIdx = 0;
        boolean[] visited = new boolean[n];
        visited[0] = true;
        Queue<Integer> queue = new ArrayDeque<>();
        queue.offer(0);

        while (!queue.isEmpty()) {
            int u = queue.poll();
            order[orderIdx++] = u;
            for (int v : adj.get(u)) {
                if (!visited[v]) {
                    visited[v] = true;
                    parent[v] = u;
                    queue.offer(v);
                }
            }
        }

        int[] count = new int[n];
        Arrays.fill(count, 1);
        int[] ans = new int[n];

        for (int i = n - 1; i > 0; i--) {
            int u = order[i];
            int p = parent[u];
            count[p] += count[u];
            ans[p] += ans[u] + count[u];
        }

        for (int i = 1; i < n; i++) {
            int u = order[i];
            int p = parent[u];
            ans[u] = ans[p] - count[u] + (n - count[u]);
        }

        return ans;
    }
}`,
        approach: 'Iterative Topological Tree Rerooting',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var sumOfDistancesInTree = function(n, edges) {
    if (n <= 1) return [0];

    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    const parent = new Int32Array(n).fill(-1);
    const order = [];
    const visited = new Uint8Array(n);
    visited[0] = 1;
    const queue = [0];

    let head = 0;
    while (head < queue.length) {
        const u = queue[head++];
        order.push(u);
        for (const v of adj[u]) {
            if (!visited[v]) {
                visited[v] = 1;
                parent[v] = u;
                queue.push(v);
            }
        }
    }

    const count = new Int32Array(n).fill(1);
    const ans = new Int32Array(n);

    for (let i = n - 1; i > 0; i--) {
        const u = order[i];
        const p = parent[u];
        count[p] += count[u];
        ans[p] += ans[u] + count[u];
    }

    for (let i = 1; i < n; i++) {
        const u = order[i];
        const p = parent[u];
        ans[u] = ans[p] - count[u] + (n - count[u]);
    }

    return Array.from(ans);
};`,
        approach: '2-Pass Iterative Tree Rerooting DP',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  'longest-increasing-path-in-a-matrix': {
    complexity: {
      kind: 'big-o',
      time: 'O(M * N)',
      space: 'O(M * N)',
      variables: [
        'M: matrix rows (M <= 200)',
        'N: matrix columns (N <= 200)'
      ],
      notes: "Iterative topological sort (Kahn's BFS) on DAG formed by strictly increasing cell values.",
      whyNaiveFails: 'Exhaustive depth-first search without memoization from every cell explores up to 4^(M * N) branching paths. For a 200 x 200 grid (40,000 cells), 4^40000 operations causes immediate Time Limit Exceeded, while deep recursive DFS can exceed standard language thread stack limits.',
      spaceTimeTradeoff: 'Allocating an O(M * N) auxiliary table for cell in-degrees and BFS queue states ensures each directed transition (u, v) is traversed exactly once, achieving optimal O(M * N) time.',
      interviewerExpectation: 'Recognizing that strictly increasing values prevent directed cycles (guaranteeing the grid is an implicit DAG); understanding both topological BFS (peeling layers) and memoized DFS as equivalent O(M * N) solutions.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from collections import deque

class Solution:
    def longestIncreasingPath(self, matrix: list[list[int]]) -> int:
        if not matrix or not matrix[0]:
            return 0
        m, n = len(matrix), len(matrix[0])
        in_degree = [[0] * n for _ in range(m)]

        for r in range(m):
            for c in range(n):
                for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and matrix[nr][nc] < matrix[r][c]:
                        in_degree[r][c] += 1

        queue = deque([(r, c) for r in range(m) for c in range(n) if in_degree[r][c] == 0])
        length = 0

        while queue:
            length += 1
            for _ in range(len(queue)):
                r, c = queue.popleft()
                for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and matrix[nr][nc] > matrix[r][c]:
                        in_degree[nr][nc] -= 1
                        if in_degree[nr][nc] == 0:
                            queue.append((nr, nc))

        return length`,
        approach: "Iterative Topological Sort (Kahn's Algorithm on Grid DAG)",
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>
#include <queue>

using namespace std;

class Solution {
public:
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        if (matrix.empty() || matrix[0].empty()) return 0;
        int m = matrix.size(), n = matrix[0].size();
        vector<vector<int>> inDegree(m, vector<int>(n, 0));
        const int dirs[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                for (auto& d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && matrix[nr][nc] < matrix[r][c]) {
                        inDegree[r][c]++;
                    }
                }
            }
        }

        queue<pair<int, int>> q;
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (inDegree[r][c] == 0) q.push({r, c});
            }
        }

        int length = 0;
        while (!q.empty()) {
            length++;
            int sz = q.size();
            for (int i = 0; i < sz; ++i) {
                auto [r, c] = q.front();
                q.pop();
                for (auto& d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && matrix[nr][nc] > matrix[r][c]) {
                        if (--inDegree[nr][nc] == 0) {
                            q.push({nr, nc});
                        }
                    }
                }
            }
        }
        return length;
    }
};`,
        approach: "Kahn's Topological Layer BFS on Grid DAG",
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.Queue;
import java.util.ArrayDeque;

class Solution {
    public int longestIncreasingPath(int[][] matrix) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return 0;
        int m = matrix.length, n = matrix[0].length;
        int[][] inDegree = new int[m][n];
        int[][] dirs = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                for (int[] d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && matrix[nr][nc] < matrix[r][c]) {
                        inDegree[r][c]++;
                    }
                }
            }
        }

        Queue<int[]> queue = new ArrayDeque<>();
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (inDegree[r][c] == 0) queue.offer(new int[]{r, c});
            }
        }

        int length = 0;
        while (!queue.isEmpty()) {
            length++;
            int sz = queue.size();
            for (int i = 0; i < sz; i++) {
                int[] curr = queue.poll();
                int r = curr[0], c = curr[1];
                for (int[] d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && matrix[nr][nc] > matrix[r][c]) {
                        if (--inDegree[nr][nc] == 0) {
                            queue.offer(new int[]{nr, nc});
                        }
                    }
                }
            }
        }
        return length;
    }
}`,
        approach: "Topological In-Degree Peeling on Implicit DAG",
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function(matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) return 0;
    const m = matrix.length, n = matrix[0].length;
    const inDegree = Array.from({ length: m }, () => new Int32Array(n));
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && matrix[nr][nc] < matrix[r][c]) {
                    inDegree[r][c]++;
                }
            }
        }
    }

    const queue = [];
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (inDegree[r][c] === 0) queue.push([r, c]);
        }
    }

    let length = 0;
    let head = 0;
    while (head < queue.length) {
        length++;
        const end = queue.length;
        while (head < end) {
            const [r, c] = queue[head++];
            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && matrix[nr][nc] > matrix[r][c]) {
                    inDegree[nr][nc]--;
                    if (inDegree[nr][nc] === 0) {
                        queue.push([nr, nc]);
                    }
                }
            }
        }
    }
    return length;
};`,
        approach: "Iterative Topological Sort (Kahn's BFS)",
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  'minimum-cost-to-make-at-least-one-valid-path-in-a-grid': {
    complexity: {
      kind: 'big-o',
      time: 'O(M * N)',
      space: 'O(M * N)',
      variables: [
        'M: grid rows (M <= 100)',
        'N: grid columns (N <= 100)'
      ],
      notes: '0-1 BFS using deque with push-front for weight 0 and push-back for weight 1.',
      whyNaiveFails: 'Standard Dijkstra uses a binary heap with O(log(M * N)) operations per extraction, yielding O(M * N log(M * N)) time. Because edge weights are restricted strictly to {0, 1}, heap-based sorting adds unnecessary overhead compared to direct deque queueing.',
      spaceTimeTradeoff: 'Using an O(M * N) double-ended queue (deque) maintains monotonically non-decreasing distances without sorting by pushing weight-0 transitions to the front and weight-1 transitions to the back, achieving optimal O(M * N) linear time.',
      interviewerExpectation: 'Explaining why 0-1 BFS maintains the monotonic priority queue invariant without a heap; pruning non-optimal paths with cost > dist[r][c]; mapping the 1-indexed directions 1=right, 2=left, 3=lower, 4=upper accurately.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from collections import deque

class Solution:
    def minCost(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        dirs = [(0, 1), (0, -1), (1, 0), (-1, 0)]
        dist = [[float('inf')] * n for _ in range(m)]
        dist[0][0] = 0
        dq = deque([(0, 0, 0)])

        while dq:
            r, c, cost = dq.popleft()
            if r == m - 1 and c == n - 1:
                return cost
            if cost > dist[r][c]:
                continue
            for d, (dr, dc) in enumerate(dirs, 1):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n:
                    weight = 0 if grid[r][c] == d else 1
                    if cost + weight < dist[nr][nc]:
                        dist[nr][nc] = cost + weight
                        if weight == 0:
                            dq.appendleft((nr, nc, cost))
                        else:
                            dq.append((nr, nc, cost + 1))
        return dist[m-1][n-1]`,
        approach: '0/1 BFS Deque Optimization (Cost 0 vs Cost 1)',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>
#include <deque>
#include <tuple>

using namespace std;

class Solution {
public:
    int minCost(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        const int INF = 1e9;
        vector<vector<int>> dist(m, vector<int>(n, INF));
        dist[0][0] = 0;

        deque<tuple<int, int, int>> dq;
        dq.push_back({0, 0, 0});
        const int dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

        while (!dq.empty()) {
            auto [r, c, cost] = dq.front();
            dq.pop_front();

            if (r == m - 1 && c == n - 1) return cost;
            if (cost > dist[r][c]) continue;

            for (int d = 1; d <= 4; ++d) {
                int nr = r + dirs[d - 1][0];
                int nc = c + dirs[d - 1][1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
                    int weight = (grid[r][c] == d) ? 0 : 1;
                    if (cost + weight < dist[nr][nc]) {
                        dist[nr][nc] = cost + weight;
                        if (weight == 0) {
                            dq.push_front({nr, nc, cost});
                        } else {
                            dq.push_back({nr, nc, cost + 1});
                        }
                    }
                }
            }
        }
        return dist[m - 1][n - 1];
    }
};`,
        approach: '0-1 BFS Double-Ended Queue Shortest Path',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.Deque;
import java.util.ArrayDeque;
import java.util.Arrays;

class Solution {
    public int minCost(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int[][] dist = new int[m][n];
        for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);
        dist[0][0] = 0;

        Deque<int[]> dq = new ArrayDeque<>();
        dq.offer(new int[]{0, 0, 0});
        int[][] dirs = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

        while (!dq.isEmpty()) {
            int[] curr = dq.pollFirst();
            int r = curr[0], c = curr[1], cost = curr[2];

            if (r == m - 1 && c == n - 1) return cost;
            if (cost > dist[r][c]) continue;

            for (int d = 1; d <= 4; d++) {
                int nr = r + dirs[d - 1][0];
                int nc = c + dirs[d - 1][1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
                    int weight = (grid[r][c] == d) ? 0 : 1;
                    if (cost + weight < dist[nr][nc]) {
                        dist[nr][nc] = cost + weight;
                        if (weight == 0) {
                            dq.offerFirst(new int[]{nr, nc, cost});
                        } else {
                            dq.offerLast(new int[]{nr, nc, cost + 1});
                        }
                    }
                }
            }
        }
        return dist[m - 1][n - 1];
    }
}`,
        approach: '0-1 BFS with ArrayDeque',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[][]} grid
 * @return {number}
 */
var minCost = function(grid) {
    const m = grid.length, n = grid[0].length;
    const dist = Array.from({ length: m }, () => Array(n).fill(Infinity));
    dist[0][0] = 0;

    const dq = [[0, 0, 0]];
    let head = 0;
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    while (head < dq.length) {
        const [r, c, cost] = dq[head++];
        if (r === m - 1 && c === n - 1) return cost;
        if (cost > dist[r][c]) continue;

        for (let d = 1; d <= 4; d++) {
            const [dr, dc] = dirs[d - 1];
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
                const weight = grid[r][c] === d ? 0 : 1;
                if (cost + weight < dist[nr][nc]) {
                    dist[nr][nc] = cost + weight;
                    if (weight === 0) {
                        dq.splice(head, 0, [nr, nc, cost]);
                    } else {
                        dq.push([nr, nc, cost + 1]);
                    }
                }
            }
        }
    }
    return dist[m - 1][n - 1];
};`,
        approach: '0-1 BFS Double-Ended Queue State Expansion',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  // ==========================================
  // 5 DATABASE PROBLEMS
  // ==========================================
  'combine-two-tables': {
    complexity: {
      kind: 'query-notes',
      time: 'O(P + A)',
      space: 'O(P)',
      variables: [
        'P: rows in Person',
        'A: rows in Address'
      ],
      notes: 'Single pass outer hash or index join over Person and Address tables.',
      whyNaiveFails: 'A Cartesian product (FROM Person, Address) produces P x A intermediate rows before filtering with a WHERE clause. For large tables, this materializes unnecessary cross-product tuples in memory. An INNER JOIN erroneously discards people who do not have an address entry.',
      spaceTimeTradeoff: 'A LEFT JOIN with index support on Address(personId) streams the outer table in O(P) time with O(1) extra space, or performs a single-pass hash join in O(P + A) time and O(P) auxiliary memory without intermediate sorting.',
      interviewerExpectation: 'Immediate recognition of LEFT JOIN semantics to retain Person rows having null address fields; leveraging foreign key indexes on personId.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT p.firstName, p.lastName, a.city, a.state
FROM Person p
LEFT JOIN Address a ON p.personId = a.personId;`,
        approach: 'Left Outer Join on Foreign Key',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'postgresql',
        code: `SELECT p.firstName, p.lastName, a.city, a.state
FROM Person p
LEFT JOIN Address a ON p.personId = a.personId;`,
        approach: 'PostgreSQL Left Outer Join on personId',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def combine_two_tables(person: pd.DataFrame, address: pd.DataFrame) -> pd.DataFrame:
    merged = person.merge(address, on='personId', how='left')
    return merged[['firstName', 'lastName', 'city', 'state']]`,
        approach: 'Pandas Left Merge on personId',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  'second-highest-salary': {
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(1)',
      variables: [
        'N: rows in Employee table'
      ],
      notes: 'Scalar subquery wrapping DISTINCT salary ordering with LIMIT 1 OFFSET 1.',
      whyNaiveFails: 'Using SELECT DISTINCT salary ... LIMIT 1 OFFSET 1 directly without a wrapper subquery or NULL-coalesce returns zero rows (an empty set) instead of null when the table contains fewer than 2 distinct salaries, failing the LeetCode schema contract.',
      spaceTimeTradeoff: 'Wrapping the scalar query in SELECT (...) AS SecondHighestSalary evaluates in O(N log N) time (or O(N) with an index scan on salary DESC) with O(1) memory, returning null automatically upon an empty result set.',
      interviewerExpectation: 'Handling the edge cases where all salaries are identical or only 1 employee exists (must return null); deduplicating with DISTINCT before ordering.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT (
  SELECT DISTINCT salary
  FROM Employee
  ORDER BY salary DESC
  LIMIT 1 OFFSET 1
) AS SecondHighestSalary;`,
        approach: 'Scalar Subquery with Limit Offset Handling Null',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'postgresql',
        code: `SELECT (
  SELECT DISTINCT salary
  FROM Employee
  ORDER BY salary DESC
  LIMIT 1 OFFSET 1
) AS "SecondHighestSalary";`,
        approach: 'PostgreSQL Scalar Subquery with Limit Offset',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def second_highest_salary(employee: pd.DataFrame) -> pd.DataFrame:
    unique_salaries = employee['salary'].drop_duplicates().sort_values(ascending=False)
    if len(unique_salaries) < 2:
        return pd.DataFrame({'SecondHighestSalary': [None]})
    second_salary = unique_salaries.iloc[1]
    return pd.DataFrame({'SecondHighestSalary': [second_salary]})`,
        approach: 'Pandas Drop Duplicates and Second Element Selection',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  'department-highest-salary': {
    complexity: {
      kind: 'query-notes',
      time: 'O(E + D)',
      space: 'O(D)',
      variables: [
        'E: rows in Employee table',
        'D: rows in Department table'
      ],
      notes: 'Inner join with grouped maximum salary subquery on (departmentId, salary).',
      whyNaiveFails: 'Correlated subqueries in the SELECT clause (SELECT (SELECT MAX(...) ... WHERE ...)) execute once per employee row (O(E * E) full scans). Joining without a composite tuple match (departmentId, salary) can mismatch salaries across different departments.',
      spaceTimeTradeoff: 'Grouping once by department to compute MAX(salary) requires O(E) time and O(D) hash table memory, enabling an optimal hash-semijoin in O(E + D) total execution time.',
      interviewerExpectation: 'Handling salary ties properly (if two employees in the same department share the max salary, both must be returned); using composite tuple matching or window functions (DENSE_RANK()).'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary
FROM Employee e
JOIN Department d ON e.departmentId = d.id
WHERE (e.departmentId, e.salary) IN (
  SELECT departmentId, MAX(salary)
  FROM Employee
  GROUP BY departmentId
);`,
        approach: 'Group By Maximum Salary Semi-Join',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'postgresql',
        code: `SELECT d.name AS "Department", e.name AS "Employee", e.salary AS "Salary"
FROM Employee e
JOIN Department d ON e.departmentId = d.id
WHERE (e.departmentId, e.salary) IN (
  SELECT departmentId, MAX(salary)
  FROM Employee
  GROUP BY departmentId
);`,
        approach: 'PostgreSQL Composite In-Clause Semi-Join',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def department_highest_salary(employee: pd.DataFrame, department: pd.DataFrame) -> pd.DataFrame:
    if employee.empty or department.empty:
        return pd.DataFrame(columns=['Department', 'Employee', 'Salary'])
    merged = employee.merge(department, left_on='departmentId', right_on='id', suffixes=('_employee', '_department'))
    max_salary_per_dept = merged.groupby('departmentId')['salary'].transform('max')
    highest = merged[merged['salary'] == max_salary_per_dept]
    result = highest[['name_department', 'name_employee', 'salary']].copy()
    result.columns = ['Department', 'Employee', 'Salary']
    return result`,
        approach: 'Pandas Merge and Groupby Transform Max Filter',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  'rising-temperature': {
    complexity: {
      kind: 'query-notes',
      time: 'O(N)',
      space: 'O(1)',
      variables: [
        'N: rows in Weather table'
      ],
      notes: 'Self-join matching recordDate with yesterday using DATE_ADD interval.',
      whyNaiveFails: 'A cross-join of Weather with itself without indexed date arithmetic scans N^2 pairs. Filtering by w1.id = w2.id + 1 fails when record IDs are non-consecutive or dates have gaps; date differences must be measured using temporal intervals.',
      spaceTimeTradeoff: 'Self-joining on w1.recordDate = DATE_ADD(w2.recordDate, INTERVAL 1 DAY) utilizes a B-tree index on recordDate, reducing execution from quadratic nested scans to O(N) index-lookup time with O(1) temporary memory.',
      interviewerExpectation: "Using date arithmetic functions (DATE_ADD in MySQL, + INTERVAL '1 day' in PostgreSQL) rather than subtracting IDs; strictly comparing temperatures with >."
    },
    solutions: [
      {
        lang: 'mysql',
        code: `SELECT w1.id
FROM Weather w1
JOIN Weather w2 ON w1.recordDate = DATE_ADD(w2.recordDate, INTERVAL 1 DAY)
WHERE w1.temperature > w2.temperature;`,
        approach: 'Self Join on Date Interval Arithmetic',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'postgresql',
        code: `SELECT w1.id
FROM Weather w1
JOIN Weather w2 ON w1.recordDate = w2.recordDate + INTERVAL '1 day'
WHERE w1.temperature > w2.temperature;`,
        approach: 'PostgreSQL Temporal Interval Join',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

def rising_temperature(weather: pd.DataFrame) -> pd.DataFrame:
    weather['recordDate'] = pd.to_datetime(weather['recordDate'])
    weather = weather.sort_values('recordDate')
    prev_weather = weather.copy()
    prev_weather['recordDate'] = prev_weather['recordDate'] + pd.Timedelta(days=1)
    merged = weather.merge(prev_weather, on='recordDate', suffixes=('', '_prev'))
    rising = merged[merged['temperature'] > merged['temperature_prev']]
    return rising[['id']]`,
        approach: 'Pandas Timedelta Shift and Merge',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  'delete-duplicate-emails': {
    complexity: {
      kind: 'query-notes',
      time: 'O(N log N)',
      space: 'O(1)',
      variables: [
        'N: rows in Person table'
      ],
      notes: 'Multi-table DELETE self-join matching email with greater id.',
      whyNaiveFails: 'A naive DELETE FROM Person WHERE id NOT IN (SELECT MIN(id) FROM Person GROUP BY email) in MySQL fails with error 1093 ("You cannot specify target table for update in FROM clause"). A naive subquery also risks full-table locking.',
      spaceTimeTradeoff: 'Self-joining Person p1 JOIN Person p2 on matching email and p1.id > p2.id allows MySQL and PostgreSQL to delete in-place during the join scan in O(N log N) time without temporary materialized subquery tables.',
      interviewerExpectation: 'Understanding MySQL multi-table DELETE syntax (DELETE p1 FROM Person p1 JOIN Person p2); ensuring that only duplicate rows with strictly larger IDs are deleted while retaining the minimal ID.'
    },
    solutions: [
      {
        lang: 'mysql',
        code: `DELETE p1
FROM Person p1
JOIN Person p2 ON p1.email = p2.email AND p1.id > p2.id;`,
        approach: 'In-Place Multi-Table DELETE Self-Join',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'postgresql',
        code: `DELETE FROM Person p1
USING Person p2
WHERE p1.email = p2.email AND p1.id > p2.id;`,
        approach: 'PostgreSQL DELETE USING Self-Join',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'pythondata',
        code: `import pandas as pd

# Modify Person in place
def delete_duplicate_emails(person: pd.DataFrame) -> None:
    person.sort_values(by='id', ascending=True, inplace=True)
    null_rows = person[person['email'].isna()]\n    valid_rows = person[person['email'].notna()].drop_duplicates(subset=['email'], keep='first')\n    combined = pd.concat([valid_rows, null_rows]).sort_values(by='id')\n    person.drop(person.index.difference(combined.index), inplace=True)`,
        approach: 'Pandas In-Place Sort and Drop Duplicates',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  // ==========================================
  // 3 CONCURRENCY PROBLEMS
  // ==========================================
  'print-in-order': {
    complexity: {
      kind: 'none',
      time: 'n/a',
      space: 'n/a',
      variables: [],
      notes: 'Event-driven thread coordination with zero CPU busy-waiting.',
      whyNaiveFails: 'Busy-waiting with while (!done); spins the CPU at 100% core utilization, creating thread contention, cache thrashing, and potential starvation under preemption or non-realtime OS thread schedulers.',
      spaceTimeTradeoff: 'Using two binary synchronization events/semaphores requires O(1) memory and suspends waiting threads without CPU consumption, ensuring sequential execution with zero thread drift.',
      interviewerExpectation: 'Avoiding spinlocks / busy-waits; handling InterruptedException in Java / condition variable predicate spurious wakeups in C++; understanding why two coordination barriers are necessary to enforce a three-step sequence.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from threading import Event

class Foo:
    def __init__(self):
        self.first_done = Event()
        self.second_done = Event()

    def first(self, printFirst: 'Callable[[], None]') -> None:
        printFirst()
        self.first_done.set()

    def second(self, printSecond: 'Callable[[], None]') -> None:
        self.first_done.wait()
        printSecond()
        self.second_done.set()

    def third(self, printThird: 'Callable[[], None]') -> None:
        self.second_done.wait()
        printThird()`,
        approach: 'Thread Events Sequential Unblocking',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <mutex>
#include <condition_variable>
#include <functional>

using namespace std;

class Foo {
private:
    std::mutex mtx;
    std::condition_variable cv;
    int step = 1;

public:
    Foo() {}

    void first(function<void()> printFirst) {
        std::unique_lock<std::mutex> lock(mtx);
        printFirst();
        step = 2;
        cv.notify_all();
    }

    void second(function<void()> printSecond) {
        std::unique_lock<std::mutex> lock(mtx);
        cv.wait(lock, [this]() { return step == 2; });
        printSecond();
        step = 3;
        cv.notify_all();
    }

    void third(function<void()> printThird) {
        std::unique_lock<std::mutex> lock(mtx);
        cv.wait(lock, [this]() { return step == 3; });
        printThird();
    }
};`,
        approach: 'Mutex and Condition Variable Sequence Synchronization',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.concurrent.Semaphore;

class Foo {
    private final Semaphore s12 = new Semaphore(0);
    private final Semaphore s23 = new Semaphore(0);

    public Foo() {}

    public void first(Runnable printFirst) throws InterruptedException {
        printFirst.run();
        s12.release();
    }

    public void second(Runnable printSecond) throws InterruptedException {
        s12.acquire();
        printSecond.run();
        s23.release();
    }

    public void third(Runnable printThird) throws InterruptedException {
        s23.acquire();
        printThird.run();
    }
}`,
        approach: 'Two Semaphore Sequential Barrier',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  'print-foobar-alternately': {
    complexity: {
      kind: 'none',
      time: 'n/a',
      space: 'n/a',
      variables: [],
      notes: 'Ping-pong synchronization across n cycles.',
      whyNaiveFails: 'Unsynchronized alternating loops produce race conditions where bar prints before foo or multiple foo calls interleave consecutively. Busy-waiting using volatile flags wastes CPU cycles and fails on weakly-ordered memory architectures.',
      spaceTimeTradeoff: 'Pairing two semaphores (or condition variables with a boolean predicate) requires O(1) memory and suspends threads during opposite turns, ensuring exact alternating lockstep in O(N) total operations.',
      interviewerExpectation: 'Initializing the first semaphore with 1 permit and the second with 0; proper semaphore permit handoff (foo releases bar, bar releases foo); deadlock prevention and clean thread termination after N cycles.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from threading import Semaphore

class FooBar:
    def __init__(self, n):
        self.n = n
        self.foo_sem = Semaphore(1)
        self.bar_sem = Semaphore(0)

    def foo(self, printFoo: 'Callable[[], None]') -> None:
        for _ in range(self.n):
            self.foo_sem.acquire()
            printFoo()
            self.bar_sem.release()

    def bar(self, printBar: 'Callable[[], None]') -> None:
        for _ in range(self.n):
            self.bar_sem.acquire()
            printBar()
            self.foo_sem.release()`,
        approach: 'Dual Semaphore Alternating Signal',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <mutex>
#include <condition_variable>
#include <functional>

using namespace std;

class FooBar {
private:
    int n;
    std::mutex mtx;
    std::condition_variable cv;
    bool fooTurn = true;

public:
    FooBar(int n) {
        this->n = n;
    }

    void foo(function<void()> printFoo) {
        for (int i = 0; i < n; i++) {
            std::unique_lock<std::mutex> lock(mtx);
            cv.wait(lock, [this]() { return fooTurn; });
            printFoo();
            fooTurn = false;
            cv.notify_one();
        }
    }

    void bar(function<void()> printBar) {
        for (int i = 0; i < n; i++) {
            std::unique_lock<std::mutex> lock(mtx);
            cv.wait(lock, [this]() { return !fooTurn; });
            printBar();
            fooTurn = true;
            cv.notify_one();
        }
    }
};`,
        approach: 'Condition Variable Turn Synchronization',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.concurrent.Semaphore;

class FooBar {
    private int n;
    private final Semaphore fooSem = new Semaphore(1);
    private final Semaphore barSem = new Semaphore(0);

    public FooBar(int n) {
        this.n = n;
    }

    public void foo(Runnable printFoo) throws InterruptedException {
        for (int i = 0; i < n; i++) {
            fooSem.acquire();
            printFoo.run();
            barSem.release();
        }
    }

    public void bar(Runnable printBar) throws InterruptedException {
        for (int i = 0; i < n; i++) {
            barSem.acquire();
            printBar.run();
            fooSem.release();
        }
    }
}`,
        approach: 'Dual Semaphore Permitted Alternation',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  'building-h2o': {
    complexity: {
      kind: 'none',
      time: 'n/a',
      space: 'n/a',
      variables: [],
      notes: 'Group synchronization with 2:1 stoichiometric molecular barrier.',
      whyNaiveFails: 'Without atomic grouping barriers, oxygen threads can outpace hydrogen or three hydrogens can bind simultaneously, violating the strict 2:1 stoichiometric molecular invariant. Spin-locking on thread counters risks deadlocks under thread starvation.',
      spaceTimeTradeoff: 'Two counting semaphores (2 permits for H, 1 permit for O) coupled with a 3-party barrier require O(1) auxiliary synchronization memory and guarantee exact (2H, 1O) molecular groups without unbounded thread queuing.',
      interviewerExpectation: 'Ensuring exactly two hydrogen atoms pair with one oxygen before any party departs the barrier; releasing permits in finally blocks; preventing thread deadlocks when molecules arrive out of order.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from threading import Semaphore, Barrier

class H2O:
    def __init__(self):
        self.sem_h = Semaphore(2)
        self.sem_o = Semaphore(1)
        self.barrier = Barrier(3)

    def hydrogen(self, releaseHydrogen: 'Callable[[], None]') -> None:
        self.sem_h.acquire()
        self.barrier.wait()
        releaseHydrogen()
        self.sem_h.release()

    def oxygen(self, releaseOxygen: 'Callable[[], None]') -> None:
        self.sem_o.acquire()
        self.barrier.wait()
        releaseOxygen()
        self.sem_o.release()`,
        approach: 'Semaphore Capacity and Cyclic Barrier Grouping',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <mutex>
#include <condition_variable>
#include <functional>

using namespace std;

class H2O {
private:
    std::mutex mtx;
    std::condition_variable cv;
    int hCount = 0;

public:
    H2O() {}

    void hydrogen(function<void()> releaseHydrogen) {
        std::unique_lock<std::mutex> lock(mtx);
        cv.wait(lock, [this]() { return hCount < 2; });
        releaseHydrogen();
        hCount++;
        cv.notify_all();
    }

    void oxygen(function<void()> releaseOxygen) {
        std::unique_lock<std::mutex> lock(mtx);
        cv.wait(lock, [this]() { return hCount == 2; });
        releaseOxygen();
        hCount = 0;
        cv.notify_all();
    }
};`,
        approach: 'Condition Variable Stoichiometric Counter',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.concurrent.Semaphore;
import java.util.concurrent.CyclicBarrier;

class H2O {
    private final Semaphore hSem = new Semaphore(2);
    private final Semaphore oSem = new Semaphore(1);
    private final CyclicBarrier barrier = new CyclicBarrier(3);

    public H2O() {}

    public void hydrogen(Runnable releaseHydrogen) throws InterruptedException {
        hSem.acquire();
        try {
            barrier.await();
            releaseHydrogen.run();
        } catch (Exception e) {
            Thread.currentThread().interrupt();
        } finally {
            hSem.release();
        }
    }

    public void oxygen(Runnable releaseOxygen) throws InterruptedException {
        oSem.acquire();
        try {
            barrier.await();
            releaseOxygen.run();
        } catch (Exception e) {
            Thread.currentThread().interrupt();
        } finally {
            oSem.release();
        }
    }
}`,
        approach: 'Counting Semaphores and CyclicBarrier',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  // ==========================================
  // 3 JAVASCRIPT PROBLEMS
  // ==========================================
  'counter': {
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: [],
      notes: 'Constant time post-increment closure invocation.',
      whyNaiveFails: 'Using global or module-scoped state allows only a single counter instance at a time; multiple createCounter calls overwrite each other\'s state, corrupting independent execution contexts.',
      spaceTimeTradeoff: 'Lexical closure creates an isolated O(1) scope frame per instance, providing O(1) invocation time and O(1) persistent heap memory per counter instance.',
      interviewerExpectation: 'Returning the current value before incrementing (count++ vs ++count); explaining JavaScript closure mechanics and garbage collection semantics of retained lexical environments.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {number} n
 * @return {Function} counter
 */
var createCounter = function(n) {
    let count = n;
    return function() {
        return count++;
    };
};`,
        approach: 'Lexical Closure State Encapsulation',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'typescript',
        code: `function createCounter(n: number): () => number {
    let count = n;
    return function(): number {
        return count++;
    };
}`,
        approach: 'TypeScript Typed Closure Function Factory',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  'sleep': {
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: [],
      notes: 'Asynchronous event loop timer resolution via setTimeout Promise.',
      whyNaiveFails: 'Using synchronous blocking loops (e.g., while (Date.now() < target)) freezes the single-threaded JavaScript event loop entirely, preventing DOM rendering, I/O handling, and timers across the browser tab or Node process.',
      spaceTimeTradeoff: 'Registering an asynchronous timer callback with setTimeout consumes O(1) memory and yields the thread back to the event loop, allowing concurrent I/O during the O(1) delay setup.',
      interviewerExpectation: 'Understanding Promise constructor mechanics and timer queue scheduling; avoiding busy-wait blocking; understanding microtask vs macrotask execution order.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `/**
 * @param {number} millis
 * @return {Promise}
 */
async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}`,
        approach: 'Promise Wrapped Event Loop Timer',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'typescript',
        code: `async function sleep(millis: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, millis));
}`,
        approach: 'TypeScript Async Promise Wrapped Timeout',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  'event-emitter': {
    complexity: {
      kind: 'big-o',
      time: 'O(1) subscribe, O(K) emit',
      space: 'O(N)',
      variables: [
        'N: total subscribed listeners across all events',
        'K: listeners subscribed to the emitted event'
      ],
      notes: 'Map of event names to listener arrays with closure-based unsubscription.',
      whyNaiveFails: 'Searching and filtering listener lists repeatedly with string scans on every emit wastes time. Failing to isolate callbacks by event name means every event triggers unrelated listeners.',
      spaceTimeTradeoff: 'Using a hash map (Map<string, Function[]>) provides O(1) average subscription lookup and O(K) emit time where K is the number of callbacks for that event, using O(N) total storage for N registered listeners.',
      interviewerExpectation: 'Returning an unsubscribe object with clean lexical scope; handling multiple subscriptions of the identical callback without double-removing or indexing bugs; returning empty array for events with no listeners.'
    },
    solutions: [
      {
        lang: 'javascript',
        code: `class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    /**
     * @param {string} eventName
     * @param {Function} callback
     * @return {Object}
     */
    subscribe(eventName, callback) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }
        const callbacks = this.events.get(eventName);
        callbacks.push(callback);

        return {
            unsubscribe: () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1) {
                    callbacks.splice(index, 1);
                }
            }
        };
    }

    /**
     * @param {string} eventName
     * @param {Array} [args]
     * @return {Array}
     */
    emit(eventName, args = []) {
        const callbacks = this.events.get(eventName);
        if (!callbacks || callbacks.length === 0) {
            return [];
        }
        return callbacks.map(cb => cb(...args));
    }
}`,
        approach: 'Map with Closure Unsubscribe Handlers',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'typescript',
        code: `type Callback = (...args: any[]) => any;
type Subscription = {
    unsubscribe: () => void;
};

class EventEmitter {
    private events: Map<string, Callback[]>;

    constructor() {
        this.events = new Map<string, Callback[]>();
    }

    subscribe(eventName: string, callback: Callback): Subscription {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }
        const callbacks = this.events.get(eventName)!;
        callbacks.push(callback);

        return {
            unsubscribe: () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1) {
                    callbacks.splice(index, 1);
                }
            }
        };
    }

    emit(eventName: string, args: any[] = []): any[] {
        const callbacks = this.events.get(eventName);
        if (!callbacks || callbacks.length === 0) {
            return [];
        }
        return callbacks.map(cb => cb(...args));
    }
}`,
        approach: 'TypeScript Type-Safe Event Pub/Sub Registry',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  // ==========================================
  // 3 PANDAS PROBLEMS
  // ==========================================
  'create-a-dataframe-from-list': {
    complexity: {
      kind: 'query-notes',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of student records'],
      notes: 'Vectorized DataFrame instantiation from 2D sequence with column naming.',
      whyNaiveFails: 'Iterating element-by-element with Python loops or appending row-by-row (df.append / concat) incurs repeated memory reallocations, creating O(N^2) quadratic copying overhead instead of contiguous array initialization.',
      spaceTimeTradeoff: 'Bulk construction directly from a 2D sequence allocates contiguous memory blocks for column series in a single vectorized O(N) pass, using O(N) auxiliary memory for DataFrame internal representation.',
      interviewerExpectation: 'Specifying column labels directly via the columns parameter during instantiation rather than post-hoc assignment; ensuring correct integer dtype inference.'
    }
  },

  'drop-duplicate-rows': {
    complexity: {
      kind: 'query-notes',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of customer rows'],
      notes: 'Single pass C-level hash table deduplication on designated subset column.',
      whyNaiveFails: 'Iterating over rows with .iterrows() and checking membership in a manual Python set takes O(N) high-overhead bytecode operations and creates temporary Series objects per row, wasting orders of magnitude more runtime than vectorized hashing.',
      spaceTimeTradeoff: 'Vectorized deduplication uses an internal C-level hash table on the designated subset column in O(N) time with O(N) memory, avoiding python object boxing.',
      interviewerExpectation: "Using the subset parameter to restrict hashing to the target column; knowing default keep='first' retains the first occurrence."
    }
  },

  'reshape-data-pivot': {
    complexity: {
      kind: 'query-notes',
      time: 'O(N)',
      space: 'O(U * V)',
      variables: [
        'N: total weather measurement rows',
        'U: unique months count',
        'V: unique cities count'
      ],
      notes: 'Vectorized 2D cross-tabulation pivot on unique index-column pairs.',
      whyNaiveFails: 'Manual grouping, nested dictionary accumulation, and manual matrix reshaping takes quadratic interpretation time and fails when duplicate (index, column) pairs exist. Iterating through DataFrame rows is notoriously slow.',
      spaceTimeTradeoff: 'The vectorized .pivot() engine constructs a 2D index-by-column cross-tabulation in O(N) time with O(U * V) auxiliary memory where U and V are the unique counts of index and column values.',
      interviewerExpectation: 'Selecting .pivot() when index-column combinations are unique; naming index, columns, and values kwargs accurately.'
    }
  },

  // ==========================================
  // 3 SHELL PROBLEMS
  // ==========================================
  'tenth-line': {
    complexity: {
      kind: 'query-notes',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: number of lines in file.txt'],
      notes: 'Streaming single-pass line inspection with early exit capability.',
      whyNaiveFails: 'Slurping the entire file into memory with cat file.txt | head -n 10 | tail -n 1 spawns multiple pipeline processes and consumes buffer memory proportional to file size, failing or slowing down when files have fewer than 10 lines.',
      spaceTimeTradeoff: "sed -n '10p' file.txt streams line-by-line using O(1) constant buffer space and prints only line 10, executing in O(N) streaming time (or early-exiting with 10q on large files).",
      interviewerExpectation: 'Handling files with fewer than 10 lines cleanly (must output nothing); avoiding multiple spawned subshells when a single stream editor tool suffices.'
    }
  },

  'valid-phone-numbers': {
    complexity: {
      kind: 'query-notes',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: number of lines in file.txt'],
      notes: 'DFA regex matching per line buffer without loading full file into memory.',
      whyNaiveFails: 'Reading line by line with a shell while read loop executes interpreted subshell commands per line, running hundreds of times slower than native compiled regex matchers. Loose regexes match substrings inside longer invalid numbers.',
      spaceTimeTradeoff: 'grep -E utilizes a compiled deterministic finite automaton (DFA) in O(N) streaming time with O(1) memory per line buffer.',
      interviewerExpectation: 'Anchoring with ^ and $ to prevent partial matches; handling both formats (xxx) xxx-xxxx and xxx-xxx-xxxx in a single combined extended regex.'
    }
  },

  'word-frequency': {
    complexity: {
      kind: 'query-notes',
      time: 'O(W log W)',
      space: 'O(W)',
      variables: ['W: total word count in words.txt'],
      notes: 'Unix pipeline tokenizing, sorting, counting, and ranking word frequencies.',
      whyNaiveFails: 'Writing a nested shell loop with multiple file rereads takes quadratic time. Without collapsing multiple consecutive spaces and empty lines, downstream token counts are corrupted.',
      spaceTimeTradeoff: 'A Unix pipeline (tr -s -> sort -> uniq -c -> sort -nr) processes data via streaming IPC buffers in O(W log W) time with O(W) external sort buffer space.',
      interviewerExpectation: "Tokenizing whitespace properly with tr -s '[:space:]' '\\n'; sorting descending by frequency; outputting <word> <frequency> format."
    }
  }
};

function run() {
  console.log('=== Populating 3-Part Complexity & Multi-Language Solutions ===\n');

  let updatedCount = 0;
  for (const [slug, data] of Object.entries(updates)) {
    const filePath = path.join(problemsDir, `${slug}.json`);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }

    const problem = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // 1. Update complexity
    if (data.complexity) {
      problem.complexity = {
        ...problem.complexity,
        ...data.complexity
      };
    }

    // 2. Update solutions if provided
    if (data.solutions) {
      // Ensure solutions[0].code matches hint 4 code
      problem.solutions = data.solutions;
    }

    // Make sure Hint 4 code matches solutions[0].code
    const h4 = problem.hints.find(h => h.level === 4);
    if (h4 && problem.solutions && problem.solutions.length > 0) {
      const primarySol = problem.solutions[0];
      const langFence = primarySol.lang === 'python3' ? 'python' : primarySol.lang === 'pythondata' ? 'python' : primarySol.lang;
      h4.text = `\`\`\`${langFence}\n${primarySol.code}\n\`\`\``;
    }

    problem.updated = '2026-10-18T00:00:00.000Z';

    fs.writeFileSync(filePath, JSON.stringify(problem, null, 2) + '\n', 'utf8');
    console.log(`✓ Updated ${slug}.json (solutions: ${problem.solutions.map(s => s.lang).join(', ')})`);
    updatedCount++;
  }

  console.log(`\nSuccessfully updated ${updatedCount} problem files.`);
}

run();
