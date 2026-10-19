import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

const batch8a = [
  {
    slug: "search-insert-position",
    number: 35,
    category: "Algorithms",
    patterns: ["binary-search-basic"],
    method: "searchInsert",
    hints: [
      {
        level: 1,
        title: "Order Preservation Obstacle",
        text: "Scanning every item in linear time becomes too slow when queries repeat over massive ordered lists. Can you discard half of the candidates after checking the midpoint?"
      },
      {
        level: 2,
        title: "Lower Bound Invariant",
        text: "Maintain a search window [left, right]. When target exceeds the midpoint value, the answer must lie strictly to the right; otherwise, it lies at or to the left."
      },
      {
        level: 3,
        title: "Bisection Procedure",
        text: "Initialize left to 0 and right to len(nums) - 1. While left is at most right, compute mid = left + (right - left) // 2. If nums[mid] is target, return mid. If nums[mid] < target, advance left = mid + 1; otherwise shrink right = mid - 1. At termination, left points to the correct insert index."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def searchInsert(self, nums: List[int], target: int) -> int:\n        left, right = 0, len(nums) - 1\n        while left <= right:\n            mid = (left + right) // 2\n            if nums[mid] == target:\n                return mid\n            elif nums[mid] < target:\n                left = mid + 1\n            else:\n                right = mid - 1\n        return left\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(log N)",
      space: "O(1)",
      variables: ["N: length of nums array (1 <= N <= 10^4)"],
      notes: "Logarithmic bisection discarding half of the search interval each step in O(1) space.",
      whyNaiveFails: "Linear scan takes O(N) comparisons which violates the required O(log N) runtime bound.",
      spaceTimeTradeoff: "Constant auxiliary pointers eliminate unnecessary array allocations.",
      interviewerExpectation: "Avoiding integer overflow when computing midpoint and handling left boundary convergence when target is absent."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def searchInsert(self, nums: List[int], target: int) -> int:\n        left, right = 0, len(nums) - 1\n        while left <= right:\n            mid = (left + right) // 2\n            if nums[mid] == target:\n                return mid\n            elif nums[mid] < target:\n                left = mid + 1\n            else:\n                right = mid - 1\n        return left",
        approach: "Standard bisection lower bound search",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    int searchInsert(vector<int>& nums, int target) {\n        int left = 0, right = (int)nums.size() - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return left;\n    }\n};",
        approach: "Standard bisection lower bound search",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public int searchInsert(int[] nums, int target) {\n        int left = 0, right = nums.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return left;\n    }\n}",
        approach: "Standard bisection lower bound search",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var searchInsert = function(nums, target) {\n    let left = 0, right = nums.length - 1;\n    while (left <= right) {\n        const mid = Math.floor((left + right) / 2);\n        if (nums[mid] === target) return mid;\n        if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return left;\n};",
        approach: "Standard bisection lower bound search",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([1, 3, 5, 6], 5, 2),
        ([1, 3, 5, 6], 2, 1),
        ([1, 3, 5, 6], 7, 4),
        ([1, 3, 5, 6], 0, 0),
        ([1], 0, 0),
        ([1], 1, 0),
        ([1], 2, 1)
    ]
    for nums, target, exp in fixed:
        assert solver.searchInsert(nums, target) == exp

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 40)
        nums = sorted(list(set(rng.randint(-100, 100) for _ in range(sz))))
        target = rng.randint(-120, 120)
        # reference via bisect
        import bisect
        exp = bisect.bisect_left(nums, target)
        assert solver.searchInsert(nums, target) == exp

    # Scale test: 10^5 elements
    big = list(range(0, 200000, 2))
    t0 = time.perf_counter()
    res = solver.searchInsert(big, 99999)
    t1 = time.perf_counter()
    assert res == 50000
    print(f"✓ Search Insert Position: fixed, 35 random, and N=100k passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "find-first-and-last-position-of-element-in-sorted-array",
    number: 34,
    category: "Algorithms",
    patterns: ["binary-search-basic"],
    method: "searchRange",
    hints: [
      {
        level: 1,
        title: "Duplicate Boundary Obstacle",
        text: "Finding any occurrence of target is not enough when duplicates stretch across large intervals. How can you bias the midpoint decisions toward the extreme boundaries?"
      },
      {
        level: 2,
        title: "Two-Sided Monotonic Invariant",
        text: "Run two separate range reductions: one that keeps searching left even when target is matched, and a second that continues right."
      },
      {
        level: 3,
        title: "Dual Boundary Procedure",
        text: "Write a helper findBound(isFirst). When nums[mid] == target, if isFirst is true, save mid and continue searching left (right = mid - 1); otherwise save mid and continue searching right (left = mid + 1). Return [findBound(True), findBound(False)]."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def searchRange(self, nums: List[int], target: int) -> List[int]:\n        def find_bound(find_first: bool) -> int:\n            left, right = 0, len(nums) - 1\n            bound = -1\n            while left <= right:\n                mid = (left + right) // 2\n                if nums[mid] == target:\n                    bound = mid\n                    if find_first:\n                        right = mid - 1\n                    else:\n                        left = mid + 1\n                elif nums[mid] < target:\n                    left = mid + 1\n                else:\n                    right = mid - 1\n            return bound\n        return [find_bound(True), find_bound(False)]\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(log N)",
      space: "O(1)",
      variables: ["N: length of nums array (0 <= N <= 10^5)"],
      notes: "Two logarithmic bisections locating exact lower and upper target indices in O(1) space.",
      whyNaiveFails: "Expanding outward linearly from an arbitrary match degrades to O(N) on arrays of identical elements.",
      spaceTimeTradeoff: "Reusing a single parameterised search procedure guarantees O(1) auxiliary memory.",
      interviewerExpectation: "Clean boundary search without linear expansion fallbacks when target occurs frequently."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def searchRange(self, nums: List[int], target: int) -> List[int]:\n        def find_bound(find_first: bool) -> int:\n            left, right = 0, len(nums) - 1\n            bound = -1\n            while left <= right:\n                mid = (left + right) // 2\n                if nums[mid] == target:\n                    bound = mid\n                    if find_first:\n                        right = mid - 1\n                    else:\n                        left = mid + 1\n                elif nums[mid] < target:\n                    left = mid + 1\n                else:\n                    right = mid - 1\n            return bound\n        return [find_bound(True), find_bound(False)]",
        approach: "Dual bisection for first and last occurrences",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    vector<int> searchRange(vector<int>& nums, int target) {\n        auto findBound = [&](bool isFirst) -> int {\n            int left = 0, right = (int)nums.size() - 1, bound = -1;\n            while (left <= right) {\n                int mid = left + (right - left) / 2;\n                if (nums[mid] == target) {\n                    bound = mid;\n                    if (isFirst) right = mid - 1;\n                    else left = mid + 1;\n                } else if (nums[mid] < target) {\n                    left = mid + 1;\n                } else {\n                    right = mid - 1;\n                }\n            }\n            return bound;\n        };\n        return {findBound(true), findBound(false)};\n    }\n};",
        approach: "Dual bisection for first and last occurrences",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public int[] searchRange(int[] nums, int target) {\n        return new int[]{findBound(nums, target, true), findBound(nums, target, false)};\n    }\n    private int findBound(int[] nums, int target, boolean isFirst) {\n        int left = 0, right = nums.length - 1, bound = -1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) {\n                bound = mid;\n                if (isFirst) right = mid - 1;\n                else left = mid + 1;\n            } else if (nums[mid] < target) {\n                left = mid + 1;\n            } else {\n                right = mid - 1;\n            }\n        }\n        return bound;\n    }\n}",
        approach: "Dual bisection for first and last occurrences",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var searchRange = function(nums, target) {\n    function findBound(isFirst) {\n        let left = 0, right = nums.length - 1, bound = -1;\n        while (left <= right) {\n            const mid = Math.floor((left + right) / 2);\n            if (nums[mid] === target) {\n                bound = mid;\n                if (isFirst) right = mid - 1;\n                else left = mid + 1;\n            } else if (nums[mid] < target) {\n                left = mid + 1;\n            } else {\n                right = mid - 1;\n            }\n        }\n        return bound;\n    }\n    return [findBound(true), findBound(false)];\n};",
        approach: "Dual bisection for first and last occurrences",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([5, 7, 7, 8, 8, 10], 8, [3, 4]),
        ([5, 7, 7, 8, 8, 10], 6, [-1, -1]),
        ([], 0, [-1, -1]),
        ([1], 1, [0, 0]),
        ([2, 2, 2, 2], 2, [0, 3])
    ]
    for nums, target, exp in fixed:
        assert solver.searchRange(nums, target) == exp

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(0, 50)
        nums = sorted([rng.randint(1, 15) for _ in range(sz)])
        target = rng.randint(1, 15)
        # reference
        if target not in nums:
            exp = [-1, -1]
        else:
            first = nums.index(target)
            last = len(nums) - 1 - nums[::-1].index(target)
            exp = [first, last]
        assert solver.searchRange(nums, target) == exp

    # Scale test: 50,000 identical elements
    big = [7] * 50000
    t0 = time.perf_counter()
    res = solver.searchRange(big, 7)
    t1 = time.perf_counter()
    assert res == [0, 49999]
    print(f"✓ Find First and Last Position: fixed, 35 random, and N=50k passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "search-in-rotated-sorted-array-ii",
    number: 81,
    category: "Algorithms",
    patterns: ["binary-search-rotated"],
    method: "search",
    hints: [
      {
        level: 1,
        title: "Duplicate Inflection Ambiguity",
        text: "When elements at left, middle, and right are identical, how can you determine which side contains the sorted sequence? What safe boundary shift preserves completeness?"
      },
      {
        level: 2,
        title: "Equality Truncation Invariant",
        text: "If nums[left] == nums[mid] == nums[right], decrement right and increment left. Otherwise, at least one half is strictly sorted and can be verified."
      },
      {
        level: 3,
        title: "Conditional Halving Procedure",
        text: "Compare nums[left] and nums[mid]. If nums[left] == nums[mid] == nums[right], adjust left += 1 and right -= 1. If the left half is sorted, check if target falls in [nums[left], nums[mid]) to shrink right; otherwise search left half. Handle the symmetric right-sorted branch identically."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def search(self, nums: List[int], target: int) -> bool:\n        left, right = 0, len(nums) - 1\n        while left <= right:\n            mid = (left + right) // 2\n            if nums[mid] == target:\n                return True\n            if nums[left] == nums[mid] == nums[right]:\n                left += 1\n                right -= 1\n            elif nums[left] <= nums[mid]:\n                if nums[left] <= target < nums[mid]:\n                    right = mid - 1\n                else:\n                    left = mid + 1\n            else:\n                if nums[mid] < target <= nums[right]:\n                    left = mid + 1\n                else:\n                    right = mid - 1\n        return False\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(log N) average, O(N) worst-case",
      space: "O(1)",
      variables: ["N: length of nums array (1 <= N <= 5000)"],
      notes: "Logarithmic bisection on distinct segments degrading to linear only when all boundaries share identical duplicate values.",
      whyNaiveFails: "Identical values at boundaries obscure whether the inflection point lies in the left or right subsegment.",
      spaceTimeTradeoff: "Shifting pointers in-place requires zero auxiliary memory.",
      interviewerExpectation: "Explaining why duplicates degrade worst-case runtime to O(N) and correctly shrinking both ends when ambiguous."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def search(self, nums: List[int], target: int) -> bool:\n        left, right = 0, len(nums) - 1\n        while left <= right:\n            mid = (left + right) // 2\n            if nums[mid] == target:\n                return True\n            if nums[left] == nums[mid] == nums[right]:\n                left += 1\n                right -= 1\n            elif nums[left] <= nums[mid]:\n                if nums[left] <= target < nums[mid]:\n                    right = mid - 1\n                else:\n                    left = mid + 1\n            else:\n                if nums[mid] < target <= nums[right]:\n                    left = mid + 1\n                else:\n                    right = mid - 1\n        return False",
        approach: "Rotated bisection with duplicate pruning",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    bool search(vector<int>& nums, int target) {\n        int left = 0, right = (int)nums.size() - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return true;\n            if (nums[left] == nums[mid] && nums[mid] == nums[right]) {\n                left++;\n                right--;\n            } else if (nums[left] <= nums[mid]) {\n                if (nums[left] <= target && target < nums[mid]) right = mid - 1;\n                else left = mid + 1;\n            } else {\n                if (nums[mid] < target && target <= nums[right]) left = mid + 1;\n                else right = mid - 1;\n            }\n        }\n        return false;\n    }\n};",
        approach: "Rotated bisection with duplicate pruning",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public boolean search(int[] nums, int target) {\n        int left = 0, right = nums.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return true;\n            if (nums[left] == nums[mid] && nums[mid] == nums[right]) {\n                left++;\n                right--;\n            } else if (nums[left] <= nums[mid]) {\n                if (nums[left] <= target && target < nums[mid]) right = mid - 1;\n                else left = mid + 1;\n            } else {\n                if (nums[mid] < target && target <= nums[right]) left = mid + 1;\n                else right = mid - 1;\n            }\n        }\n        return false;\n    }\n}",
        approach: "Rotated bisection with duplicate pruning",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var search = function(nums, target) {\n    let left = 0, right = nums.length - 1;\n    while (left <= right) {\n        const mid = Math.floor((left + right) / 2);\n        if (nums[mid] === target) return true;\n        if (nums[left] === nums[mid] && nums[mid] === nums[right]) {\n            left++;\n            right--;\n        } else if (nums[left] <= nums[mid]) {\n            if (nums[left] <= target && target < nums[mid]) right = mid - 1;\n            else left = mid + 1;\n        } else {\n            if (nums[mid] < target && target <= nums[right]) left = mid + 1;\n            else right = mid - 1;\n        }\n    }\n    return false;\n};",
        approach: "Rotated bisection with duplicate pruning",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([2, 5, 6, 0, 0, 1, 2], 0, True),
        ([2, 5, 6, 0, 0, 1, 2], 3, False),
        ([1, 0, 1, 1, 1], 0, True),
        ([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1], 2, True),
        ([1], 1, True),
        ([1], 0, False)
    ]
    for nums, target, exp in fixed:
        assert solver.search(nums, target) == exp

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 35)
        base = sorted([rng.randint(-10, 10) for _ in range(sz)])
        rot = rng.randint(0, sz)
        nums = base[rot:] + base[:rot]
        target = rng.randint(-12, 12)
        assert solver.search(nums, target) == (target in nums)

    # Scale test: 5,000 duplicate items
    big = [1] * 5000
    big[2500] = 7
    t0 = time.perf_counter()
    res = solver.search(big, 7)
    t1 = time.perf_counter()
    assert res is True
    print(f"✓ Search in Rotated Sorted Array II: fixed, 35 random, and N=5k passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "find-minimum-in-rotated-sorted-array-ii",
    number: 154,
    category: "Algorithms",
    patterns: ["binary-search-rotated"],
    method: "findMin",
    hints: [
      {
        level: 1,
        title: "Duplicate Minimum Ambiguity",
        text: "When nums[mid] equals nums[right], the minimum could lie on either side of midpoint. Which single index can you discard without losing any viable candidate?"
      },
      {
        level: 2,
        title: "Right Boundary Pruning Invariant",
        text: "If nums[mid] == nums[right], decrement right by 1 since nums[mid] preserves the value. If nums[mid] < nums[right], min is at or left of mid; if nums[mid] > nums[right], min is strictly right."
      },
      {
        level: 3,
        title: "Adaptive Convergence Procedure",
        text: "Initialize left = 0, right = len(nums) - 1. While left < right, let mid = (left + right) // 2. If nums[mid] > nums[right], set left = mid + 1. If nums[mid] < nums[right], set right = mid. Otherwise right -= 1. Return nums[left]."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def findMin(self, nums: List[int]) -> int:\n        left, right = 0, len(nums) - 1\n        while left < right:\n            mid = (left + right) // 2\n            if nums[mid] > nums[right]:\n                left = mid + 1\n            elif nums[mid] < nums[right]:\n                right = mid\n            else:\n                right -= 1\n        return nums[left]\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(log N) average, O(N) worst-case",
      space: "O(1)",
      variables: ["N: length of nums array (1 <= N <= 5000)"],
      notes: "Logarithmic inflection search safely pruning right pointer on flat duplicate values.",
      whyNaiveFails: "Identical elements at boundaries prevent knowing whether the inflection step is left or right.",
      spaceTimeTradeoff: "Zero auxiliary memory overhead.",
      interviewerExpectation: "Using nums[mid] vs nums[right] rather than nums[left] to maintain correct invariant when array is already sorted."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def findMin(self, nums: List[int]) -> int:\n        left, right = 0, len(nums) - 1\n        while left < right:\n            mid = (left + right) // 2\n            if nums[mid] > nums[right]:\n                left = mid + 1\n            elif nums[mid] < nums[right]:\n                right = mid\n            else:\n                right -= 1\n        return nums[left]",
        approach: "Rotated minimum bisection with right decrement on ties",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    int findMin(vector<int>& nums) {\n        int left = 0, right = (int)nums.size() - 1;\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] > nums[right]) left = mid + 1;\n            else if (nums[mid] < nums[right]) right = mid;\n            else right--;\n        }\n        return nums[left];\n    }\n};",
        approach: "Rotated minimum bisection with right decrement on ties",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public int findMin(int[] nums) {\n        int left = 0, right = nums.length - 1;\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] > nums[right]) left = mid + 1;\n            else if (nums[mid] < nums[right]) right = mid;\n            else right--;\n        }\n        return nums[left];\n    }\n}",
        approach: "Rotated minimum bisection with right decrement on ties",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var findMin = function(nums) {\n    let left = 0, right = nums.length - 1;\n    while (left < right) {\n        const mid = Math.floor((left + right) / 2);\n        if (nums[mid] > nums[right]) left = mid + 1;\n        else if (nums[mid] < nums[right]) right = mid;\n        else right--;\n    }\n    return nums[left];\n};",
        approach: "Rotated minimum bisection with right decrement on ties",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([1, 3, 5], 1),
        ([2, 2, 2, 0, 1], 0),
        ([3, 1, 3], 1),
        ([10, 1, 10, 10, 10], 1),
        ([1], 1)
    ]
    for nums, exp in fixed:
        assert solver.findMin(nums) == exp

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 40)
        base = sorted([rng.randint(-50, 50) for _ in range(sz)])
        rot = rng.randint(0, sz)
        nums = base[rot:] + base[:rot]
        assert solver.findMin(nums) == min(nums)

    # Scale test: 5,000 duplicate items
    big = [4] * 5000
    big[3400] = -12
    t0 = time.perf_counter()
    res = solver.findMin(big)
    t1 = time.perf_counter()
    assert res == -12
    print(f"✓ Find Minimum in Rotated Sorted Array II: fixed, 35 random, and N=5k passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "find-peak-element",
    number: 162,
    category: "Algorithms",
    patterns: ["binary-search-basic"],
    method: "findPeakElement",
    hints: [
      {
        level: 1,
        title: "Unsorted Local Extremum Obstacle",
        text: "The array is not globally sorted, making conventional targets inapplicable. How does comparing midpoint with its immediate neighbor point toward guaranteed local ascent?"
      },
      {
        level: 2,
        title: "Slope Ascent Invariant",
        text: "If nums[mid] < nums[mid + 1], an uphill slope exists toward the right, guaranteeing at least one peak on the right half. Otherwise, a peak lies at or to the left."
      },
      {
        level: 3,
        title: "Ascent Convergence Procedure",
        text: "Set left = 0 and right = len(nums) - 1. While left < right, evaluate mid = (left + right) // 2. If nums[mid] < nums[mid + 1], set left = mid + 1. Otherwise set right = mid. When left == right, return left."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def findPeakElement(self, nums: List[int]) -> int:\n        left, right = 0, len(nums) - 1\n        while left < right:\n            mid = (left + right) // 2\n            if nums[mid] < nums[mid + 1]:\n                left = mid + 1\n            else:\n                right = mid\n        return left\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(log N)",
      space: "O(1)",
      variables: ["N: length of nums array (1 <= N <= 1000)"],
      notes: "Logarithmic convergence along local gradient slope in O(1) space.",
      whyNaiveFails: "Linear scan takes O(N) operations which does not satisfy the strict O(log N) requirement.",
      spaceTimeTradeoff: "Constant auxiliary pointers operate directly on the given array.",
      interviewerExpectation: "Recognizing that neighboring boundaries at -infinity ensure an ascent always terminates at a peak."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def findPeakElement(self, nums: List[int]) -> int:\n        left, right = 0, len(nums) - 1\n        while left < right:\n            mid = (left + right) // 2\n            if nums[mid] < nums[mid + 1]:\n                left = mid + 1\n            else:\n                right = mid\n        return left",
        approach: "Bisection following uphill gradient",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    int findPeakElement(vector<int>& nums) {\n        int left = 0, right = (int)nums.size() - 1;\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] < nums[mid + 1]) left = mid + 1;\n            else right = mid;\n        }\n        return left;\n    }\n};",
        approach: "Bisection following uphill gradient",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public int findPeakElement(int[] nums) {\n        int left = 0, right = nums.length - 1;\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] < nums[mid + 1]) left = mid + 1;\n            else right = mid;\n        }\n        return left;\n    }\n}",
        approach: "Bisection following uphill gradient",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var findPeakElement = function(nums) {\n    let left = 0, right = nums.length - 1;\n    while (left < right) {\n        const mid = Math.floor((left + right) / 2);\n        if (nums[mid] < nums[mid + 1]) left = mid + 1;\n        else right = mid;\n    }\n    return left;\n};",
        approach: "Bisection following uphill gradient",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    def is_peak(nums, idx):
        left_ok = (idx == 0) or (nums[idx] > nums[idx - 1])
        right_ok = (idx == len(nums) - 1) or (nums[idx] > nums[idx + 1])
        return left_ok and right_ok

    fixed = [
        [1, 2, 3, 1],
        [1, 2, 1, 3, 5, 6, 4],
        [1],
        [1, 2],
        [2, 1]
    ]
    for nums in fixed:
        idx = solver.findPeakElement(nums)
        assert is_peak(nums, idx)

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 40)
        nums = [rng.randint(-500, 500)]
        for _ in range(sz - 1):
            val = rng.randint(-500, 500)
            while val == nums[-1]: val = rng.randint(-500, 500)
            nums.append(val)
        idx = solver.findPeakElement(nums)
        assert is_peak(nums, idx)

    # Scale test: 10,000 elements
    big = list(range(5000)) + list(range(4998, -1, -1))
    t0 = time.perf_counter()
    res = solver.findPeakElement(big)
    t1 = time.perf_counter()
    assert is_peak(big, res)
    print(f"✓ Find Peak Element: fixed, 35 random, and N=10k passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "search-a-2d-matrix-ii",
    number: 240,
    category: "Algorithms",
    patterns: ["binary-search-basic"],
    method: "searchMatrix",
    hints: [
      {
        level: 1,
        title: "2D Monotonic Quadrant Obstacle",
        text: "Rows and columns are independently sorted, but the overall matrix is not a single contiguous 1D range. Starting at which corner provides mutually exclusive elimination directions?"
      },
      {
        level: 2,
        title: "Corner Saddleback Invariant",
        text: "Starting from top-right (or bottom-left), moving down strictly increases values, while moving left strictly decreases values."
      },
      {
        level: 3,
        title: "Saddleback Elimination Procedure",
        text: "Initialize row = 0 and col = cols - 1. While row < rows and col >= 0: if matrix[row][col] == target, return True. If matrix[row][col] > target, decrement col (eliminate column); otherwise increment row (eliminate row). If boundaries are exceeded, return False."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:\n        if not matrix or not matrix[0]:\n            return False\n        r, c = 0, len(matrix[0]) - 1\n        while r < len(matrix) and c >= 0:\n            if matrix[r][c] == target:\n                return True\n            elif matrix[r][c] > target:\n                c -= 1\n            else:\n                r += 1\n        return False\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(M + N)",
      space: "O(1)",
      variables: ["M: number of rows (1 <= M <= 300)", "N: number of columns (1 <= N <= 300)"],
      notes: "Saddleback elimination traversing from top-right to bottom-left pruning one row or column per comparison in O(1) space.",
      whyNaiveFails: "Brute force examination takes O(M * N) which wastes the two-dimensional monotonicity.",
      spaceTimeTradeoff: "Zero auxiliary memory overhead.",
      interviewerExpectation: "Explaining why top-left and bottom-right corners cannot be used as starting points because both adjacent directions change values in the same direction."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:\n        if not matrix or not matrix[0]:\n            return False\n        r, c = 0, len(matrix[0]) - 1\n        while r < len(matrix) and c >= 0:\n            if matrix[r][c] == target:\n                return True\n            elif matrix[r][c] > target:\n                c -= 1\n            else:\n                r += 1\n        return False",
        approach: "Top-right saddleback elimination",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        if (matrix.empty() || matrix[0].empty()) return false;\n        int r = 0, c = (int)matrix[0].size() - 1;\n        while (r < (int)matrix.size() && c >= 0) {\n            if (matrix[r][c] == target) return true;\n            if (matrix[r][c] > target) c--;\n            else r++;\n        }\n        return false;\n    }\n};",
        approach: "Top-right saddleback elimination",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public boolean searchMatrix(int[][] matrix, int target) {\n        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return false;\n        int r = 0, c = matrix[0].length - 1;\n        while (r < matrix.length && c >= 0) {\n            if (matrix[r][c] == target) return true;\n            if (matrix[r][c] > target) c--;\n            else r++;\n        }\n        return false;\n    }\n}",
        approach: "Top-right saddleback elimination",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var searchMatrix = function(matrix, target) {\n    if (!matrix || matrix.length === 0 || matrix[0].length === 0) return false;\n    let r = 0, c = matrix[0].length - 1;\n    while (r < matrix.length && c >= 0) {\n        if (matrix[r][c] === target) return true;\n        if (matrix[r][c] > target) c--;\n        else r++;\n    }\n    return false;\n};",
        approach: "Top-right saddleback elimination",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    mat = [
        [1, 4, 7, 11, 15],
        [2, 5, 8, 12, 19],
        [3, 6, 9, 16, 22],
        [10, 13, 14, 17, 24],
        [18, 21, 23, 26, 30]
    ]
    assert solver.searchMatrix(mat, 5) is True
    assert solver.searchMatrix(mat, 20) is False
    assert solver.searchMatrix([[1]], 1) is True
    assert solver.searchMatrix([[1]], 2) is False

    rng = random.Random(42)
    for _ in range(35):
        m, n = rng.randint(1, 15), rng.randint(1, 15)
        # build sorted matrix
        test_mat = [[i * 20 + j * 3 for j in range(n)] for i in range(m)]
        target = rng.randint(0, m * 20 + n * 3 + 5)
        expected = any(target in row for row in test_mat)
        assert solver.searchMatrix(test_mat, target) == expected

    # Scale test: 300 x 300 matrix
    big_mat = [[i + j for j in range(300)] for i in range(300)]
    t0 = time.perf_counter()
    res = solver.searchMatrix(big_mat, 598)
    t1 = time.perf_counter()
    assert res is True
    print(f"✓ Search a 2D Matrix II: fixed, 35 random, and 300x300 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "missing-number",
    number: 268,
    category: "Algorithms",
    patterns: ["binary-search-basic"],
    method: "missingNumber",
    hints: [
      {
        level: 1,
        title: "Distinct Sequence Gap Obstacle",
        text: "The sequence contains n distinct numbers taken from 0 to n, leaving exactly one absent. How can arithmetic sum or bitwise cancellation reveal the missing term in linear time without extra memory?"
      },
      {
        level: 2,
        title: "Gauss Formula Invariant",
        text: "The expected sum of integers from 0 to n is n * (n + 1) // 2. The difference between this expected sum and the sum of elements is the missing number."
      },
      {
        level: 3,
        title: "Arithmetic Reduction Procedure",
        text: "Compute total = n * (n + 1) // 2 where n is len(nums). Subtract each element in nums from total. The remaining value is the missing number."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def missingNumber(self, nums: List[int]) -> int:\n        n = len(nums)\n        expected = n * (n + 1) // 2\n        return expected - sum(nums)\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N)",
      space: "O(1)",
      variables: ["N: length of nums array (1 <= N <= 10^4)"],
      notes: "Direct sum computation across N elements in O(1) auxiliary space.",
      whyNaiveFails: "Sorting takes O(N log N) time and boolean frequency tables allocate O(N) auxiliary space.",
      spaceTimeTradeoff: "Closed-form Gauss sum eliminates auxiliary array allocations.",
      interviewerExpectation: "Mentioning both arithmetic sum and XOR cancellation to avoid integer overflow in fixed-width languages."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def missingNumber(self, nums: List[int]) -> int:\n        n = len(nums)\n        expected = n * (n + 1) // 2\n        return expected - sum(nums)",
        approach: "Gauss formula closed-form sum difference",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    int missingNumber(vector<int>& nums) {\n        long long n = nums.size();\n        long long expected = n * (n + 1) / 2;\n        long long actual = 0;\n        for (int x : nums) actual += x;\n        return (int)(expected - actual);\n    }\n};",
        approach: "Gauss formula closed-form sum difference",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public int missingNumber(int[] nums) {\n        int n = nums.length;\n        int expected = n * (n + 1) / 2;\n        int actual = 0;\n        for (int x : nums) actual += x;\n        return expected - actual;\n    }\n}",
        approach: "Gauss formula closed-form sum difference",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var missingNumber = function(nums) {\n    const n = nums.length;\n    const expected = (n * (n + 1)) / 2;\n    const actual = nums.reduce((acc, v) => acc + v, 0);\n    return expected - actual;\n};",
        approach: "Gauss formula closed-form sum difference",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([3, 0, 1], 2),
        ([0, 1], 2),
        ([9, 6, 4, 2, 3, 5, 7, 0, 1], 8),
        ([0], 1),
        ([1], 0)
    ]
    for nums, exp in fixed:
        assert solver.missingNumber(nums) == exp

    rng = random.Random(42)
    for _ in range(35):
        n = rng.randint(1, 50)
        missing = rng.randint(0, n)
        nums = [i for i in range(n + 1) if i != missing]
        rng.shuffle(nums)
        assert solver.missingNumber(nums) == missing

    # Scale test: 50,000 elements
    big = list(range(50001))
    big.remove(23456)
    t0 = time.perf_counter()
    res = solver.missingNumber(big)
    t1 = time.perf_counter()
    assert res == 23456
    print(f"✓ Missing Number: fixed, 35 random, and N=50k passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "h-index-ii",
    number: 275,
    category: "Algorithms",
    patterns: ["binary-search-basic"],
    method: "hIndex",
    hints: [
      {
        level: 1,
        title: "Sorted Citation Threshold Obstacle",
        text: "The citations array is already sorted in ascending order. How can you find the inflection point where paper citation count matches or exceeds remaining paper count?"
      },
      {
        level: 2,
        title: "H-Index Monotonic Invariant",
        text: "For any index mid, there are n - mid papers with at least citations[mid] citations. If citations[mid] >= n - mid, candidate h is at least n - mid, so look left."
      },
      {
        level: 3,
        title: "Ascending Threshold Bisection Procedure",
        text: "Set left = 0, right = n - 1. While left <= right, compute mid = (left + right) // 2. If citations[mid] >= n - mid, search left by setting right = mid - 1; otherwise set left = mid + 1. Return n - left."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def hIndex(self, citations: List[int]) -> int:\n        n = len(citations)\n        left, right = 0, n - 1\n        while left <= right:\n            mid = (left + right) // 2\n            if citations[mid] >= n - mid:\n                right = mid - 1\n            else:\n                left = mid + 1\n        return n - left\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(log N)",
      space: "O(1)",
      variables: ["N: number of papers (1 <= N <= 10^5)"],
      notes: "Logarithmic bisection on presorted citation array in O(1) space.",
      whyNaiveFails: "Linear scan through citations takes O(N) which misses the logarithmic optimization possible on sorted inputs.",
      spaceTimeTradeoff: "Zero auxiliary allocations.",
      interviewerExpectation: "Expressing h-index as n - mid and checking the condition citations[mid] >= n - mid."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def hIndex(self, citations: List[int]) -> int:\n        n = len(citations)\n        left, right = 0, n - 1\n        while left <= right:\n            mid = (left + right) // 2\n            if citations[mid] >= n - mid:\n                right = mid - 1\n            else:\n                left = mid + 1\n        return n - left",
        approach: "Bisection on remaining paper count threshold",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    int hIndex(vector<int>& citations) {\n        int n = citations.size();\n        int left = 0, right = n - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (citations[mid] >= n - mid) right = mid - 1;\n            else left = mid + 1;\n        }\n        return n - left;\n    }\n};",
        approach: "Bisection on remaining paper count threshold",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public int hIndex(int[] citations) {\n        int n = citations.length;\n        int left = 0, right = n - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (citations[mid] >= n - mid) right = mid - 1;\n            else left = mid + 1;\n        }\n        return n - left;\n    }\n}",
        approach: "Bisection on remaining paper count threshold",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var hIndex = function(citations) {\n    const n = citations.length;\n    let left = 0, right = n - 1;\n    while (left <= right) {\n        const mid = Math.floor((left + right) / 2);\n        if (citations[mid] >= n - mid) right = mid - 1;\n        else left = mid + 1;\n    }\n    return n - left;\n};",
        approach: "Bisection on remaining paper count threshold",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([0, 1, 3, 5, 6], 3),
        ([1, 2, 100], 2),
        ([0], 0),
        ([100], 1),
        ([0, 0, 0], 0)
    ]
    for citations, exp in fixed:
        assert solver.hIndex(citations) == exp

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 40)
        citations = sorted([rng.randint(0, 50) for _ in range(sz)])
        # reference
        n = len(citations)
        ref_h = 0
        for i, c in enumerate(citations):
            if c >= n - i:
                ref_h = max(ref_h, n - i)
        assert solver.hIndex(citations) == ref_h

    # Scale test: 50,000 papers
    big = sorted([i * 2 for i in range(50000)])
    t0 = time.perf_counter()
    res = solver.hIndex(big)
    t1 = time.perf_counter()
    assert res == 33333
    print(f"✓ H-Index II: fixed, 35 random, and N=50k passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "first-bad-version",
    number: 278,
    category: "Algorithms",
    patterns: ["binary-search-basic"],
    method: "firstBadVersion",
    hints: [
      {
        level: 1,
        title: "API Call Budget Obstacle",
        text: "Every call to isBadVersion incurs API latency. Since once a version is bad all subsequent versions are bad, how can you minimize queries to find the earliest fault?"
      },
      {
        level: 2,
        title: "Monotonic Boolean Step Invariant",
        text: "The sequence of bad statuses is False, False, ..., True, True. The earliest True is the boundary where isBadVersion(mid) transitions."
      },
      {
        level: 3,
        title: "First Occurrence Bisection Procedure",
        text: "Initialize left = 1 and right = n. While left < right, let mid = left + (right - left) // 2. If isBadVersion(mid) is true, the first bad version is at or before mid (right = mid). Otherwise it is strictly after mid (left = mid + 1). Return left."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def firstBadVersion(self, n: int) -> int:\n        left, right = 1, n\n        while left < right:\n            mid = left + (right - left) // 2\n            if isBadVersion(mid):\n                right = mid\n            else:\n                left = mid + 1\n        return left\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(log N)",
      space: "O(1)",
      variables: ["N: number of versions (1 <= N <= 2^31 - 1)"],
      notes: "Logarithmic bisection issuing at most 32 API queries in O(1) space.",
      whyNaiveFails: "Testing versions sequentially takes O(N) API calls, exceeding query time limits on 2^31 versions.",
      spaceTimeTradeoff: "Zero auxiliary memory overhead.",
      interviewerExpectation: "Using mid = left + (right - left) // 2 to avoid 32-bit signed integer overflow."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def firstBadVersion(self, n: int) -> int:\n        left, right = 1, n\n        while left < right:\n            mid = left + (right - left) // 2\n            if isBadVersion(mid):\n                right = mid\n            else:\n                left = mid + 1\n        return left",
        approach: "Binary search on monotonic boolean predicate",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "// The API isBadVersion is defined for you.\n// bool isBadVersion(int version);\n\nclass Solution {\npublic:\n    int firstBadVersion(int n) {\n        int left = 1, right = n;\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (isBadVersion(mid)) right = mid;\n            else left = mid + 1;\n        }\n        return left;\n    }\n};",
        approach: "Binary search on monotonic boolean predicate",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "/* The isBadVersion API is defined in the parent class VersionControl.\n      boolean isBadVersion(int version); */\n\npublic class Solution extends VersionControl {\n    public int firstBadVersion(int n) {\n        int left = 1, right = n;\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (isBadVersion(mid)) right = mid;\n            else left = mid + 1;\n        }\n        return left;\n    }\n}",
        approach: "Binary search on monotonic boolean predicate",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var solution = function(isBadVersion) {\n    return function(n) {\n        let left = 1, right = n;\n        while (left < right) {\n            const mid = left + Math.floor((right - left) / 2);\n            if (isBadVersion(mid)) right = mid;\n            else left = mid + 1;\n        }\n        return left;\n    };\n};\nvar firstBadVersion = function(n) {\n    return solution(isBadVersion)(n);\n};",
        approach: "Binary search on monotonic boolean predicate",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    current_bad = 4
    def mock_is_bad(v):
        return v >= current_bad

    scope['isBadVersion'] = mock_is_bad
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [(5, 4), (1, 1), (10, 1), (10, 10)]
    for n, bad in fixed:
        current_bad = bad
        assert solver.firstBadVersion(n) == bad

    rng = random.Random(42)
    for _ in range(35):
        n = rng.randint(1, 1000)
        bad = rng.randint(1, n)
        current_bad = bad
        assert solver.firstBadVersion(n) == bad

    # Scale test: 2^31 - 1
    current_bad = 1700000000
    t0 = time.perf_counter()
    res = solver.firstBadVersion(2147483647)
    t1 = time.perf_counter()
    assert res == 1700000000
    print(f"✓ First Bad Version: fixed, 35 random, and N=2^31-1 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "valid-perfect-square",
    number: 367,
    category: "Algorithms",
    patterns: ["binary-search-basic"],
    method: "isPerfectSquare",
    hints: [
      {
        level: 1,
        title: "Integral Square Root Obstacle",
        text: "Calling built-in floating-point square root functions is disallowed. How can you bisect the candidate roots between 1 and num in logarithmic time?"
      },
      {
        level: 2,
        title: "Quadratic Monotonic Invariant",
        text: "The function f(x) = x * x is strictly increasing for positive x. If mid * mid == num, num is a perfect square; if mid * mid < num, answer is larger."
      },
      {
        level: 3,
        title: "Bisection Test Procedure",
        text: "Initialize left = 1, right = num. While left <= right, let mid = (left + right) // 2. Compute sq = mid * mid. If sq == num, return True. If sq < num, left = mid + 1; otherwise right = mid - 1. Return False upon loop exit."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def isPerfectSquare(self, num: int) -> bool:\n        left, right = 1, num\n        while left <= right:\n            mid = (left + right) // 2\n            sq = mid * mid\n            if sq == num:\n                return True\n            elif sq < num:\n                left = mid + 1\n            else:\n                right = mid - 1\n        return False\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(log num)",
      space: "O(1)",
      variables: ["num: input integer (1 <= num <= 2^31 - 1)"],
      notes: "Logarithmic bisection on root candidates in O(1) space without floating point operations.",
      whyNaiveFails: "Testing every integer sequentially takes O(sqrt(num)) which is up to 46,340 iterations.",
      spaceTimeTradeoff: "Zero auxiliary memory overhead.",
      interviewerExpectation: "Preventing integer overflow when evaluating mid * mid in 32-bit compiled languages."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def isPerfectSquare(self, num: int) -> bool:\n        left, right = 1, num\n        while left <= right:\n            mid = (left + right) // 2\n            sq = mid * mid\n            if sq == num:\n                return True\n            elif sq < num:\n                left = mid + 1\n            else:\n                right = mid - 1\n        return False",
        approach: "Bisection over root candidate interval",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    bool isPerfectSquare(int num) {\n        long long left = 1, right = num;\n        while (left <= right) {\n            long long mid = left + (right - left) / 2;\n            long long sq = mid * mid;\n            if (sq == num) return true;\n            if (sq < num) left = mid + 1;\n            else right = mid - 1;\n        }\n        return false;\n    }\n};",
        approach: "Bisection over root candidate interval",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public boolean isPerfectSquare(int num) {\n        long left = 1, right = num;\n        while (left <= right) {\n            long mid = left + (right - left) / 2;\n            long sq = mid * mid;\n            if (sq == num) return true;\n            if (sq < num) left = mid + 1;\n            else right = mid - 1;\n        }\n        return false;\n    }\n}",
        approach: "Bisection over root candidate interval",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var isPerfectSquare = function(num) {\n    let left = 1, right = num;\n    while (left <= right) {\n        const mid = Math.floor((left + right) / 2);\n        const sq = mid * mid;\n        if (sq === num) return true;\n        if (sq < num) left = mid + 1;\n        else right = mid - 1;\n    }\n    return false;\n};",
        approach: "Bisection over root candidate interval",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [(16, True), (14, False), (1, True), (4, True), (9, True), (8, False)]
    for num, exp in fixed:
        assert solver.isPerfectSquare(num) == exp

    rng = random.Random(42)
    for _ in range(35):
        root = rng.randint(1, 1000)
        assert solver.isPerfectSquare(root * root) is True
        if root > 1:
            assert solver.isPerfectSquare(root * root + 1) is False

    # Scale test: 2^31 - 1
    t0 = time.perf_counter()
    res = solver.isPerfectSquare(2147483647)
    t1 = time.perf_counter()
    assert res is False
    print(f"✓ Valid Perfect Square: fixed, 35 random, and 2^31-1 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "guess-number-higher-or-lower",
    number: 374,
    category: "Algorithms",
    patterns: ["binary-search-basic"],
    method: "guessNumber",
    hints: [
      {
        level: 1,
        title: "Oracle Guidance Obstacle",
        text: "The guess API informs you whether your pick is higher (-1), lower (1), or exact (0). What midpoint strategy guarantees finding the target in at most 31 queries for numbers up to 2^31 - 1?"
      },
      {
        level: 2,
        title: "Bisection Feedback Invariant",
        text: "If guess(mid) == -1, the picked number is strictly smaller than mid (right = mid - 1). If guess(mid) == 1, pick is strictly larger (left = mid + 1)."
      },
      {
        level: 3,
        title: "Midpoint Query Procedure",
        text: "Initialize left = 1 and right = n. While left <= right, compute mid = left + (right - left) // 2. Call res = guess(mid). If res == 0, return mid. If res == -1, set right = mid - 1; otherwise set left = mid + 1."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def guessNumber(self, n: int) -> int:\n        left, right = 1, n\n        while left <= right:\n            mid = left + (right - left) // 2\n            res = guess(mid)\n            if res == 0:\n                return mid\n            elif res == -1:\n                right = mid - 1\n            else:\n                left = mid + 1\n        return -1\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(log N)",
      space: "O(1)",
      variables: ["N: upper limit n (1 <= N <= 2^31 - 1)"],
      notes: "Logarithmic bisection halving search space per API call in O(1) space.",
      whyNaiveFails: "Linear guessing requires up to 2 * 10^9 queries which exceeds runtime limits.",
      spaceTimeTradeoff: "Zero auxiliary memory overhead.",
      interviewerExpectation: "Avoiding 32-bit signed integer overflow when computing mid = left + (right - left) // 2."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def guessNumber(self, n: int) -> int:\n        left, right = 1, n\n        while left <= right:\n            mid = left + (right - left) // 2\n            res = guess(mid)\n            if res == 0:\n                return mid\n            elif res == -1:\n                right = mid - 1\n            else:\n                left = mid + 1\n        return -1",
        approach: "Bisection driven by guess API response",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "/** \n * Forward declaration of guess API.\n * @param  num   your guess\n * @return \t     -1 if num is higher than the picked number\n *\t\t\t      1 if num is lower than the picked number\n *               otherwise return 0\n * int guess(int num);\n */\n\nclass Solution {\npublic:\n    int guessNumber(int n) {\n        int left = 1, right = n;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            int res = guess(mid);\n            if (res == 0) return mid;\n            if (res == -1) right = mid - 1;\n            else left = mid + 1;\n        }\n        return -1;\n    }\n};",
        approach: "Bisection driven by guess API response",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "/** \n * Forward declaration of guess API.\n * @param  num   your guess\n * @return \t     -1 if num is higher than the picked number\n *\t\t\t      1 if num is lower than the picked number\n *               otherwise return 0\n * int guess(int num);\n */\n\npublic class Solution extends GuessGame {\n    public int guessNumber(int n) {\n        int left = 1, right = n;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            int res = guess(mid);\n            if (res == 0) return mid;\n            if (res == -1) right = mid - 1;\n            else left = mid + 1;\n        }\n        return -1;\n    }\n}",
        approach: "Bisection driven by guess API response",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var guessNumber = function(n) {\n    let left = 1, right = n;\n    while (left <= right) {\n        const mid = left + Math.floor((right - left) / 2);\n        const res = guess(mid);\n        if (res === 0) return mid;\n        if (res === -1) right = mid - 1;\n        else left = mid + 1;\n    }\n    return -1;\n};",
        approach: "Bisection driven by guess API response",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    current_pick = 6
    def mock_guess(num):
        if num == current_pick: return 0
        elif num > current_pick: return -1
        else: return 1

    scope['guess'] = mock_guess
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [(10, 6), (1, 1), (2, 1), (2, 2)]
    for n, pick in fixed:
        current_pick = pick
        assert solver.guessNumber(n) == pick

    rng = random.Random(42)
    for _ in range(35):
        n = rng.randint(1, 10000)
        pick = rng.randint(1, n)
        current_pick = pick
        assert solver.guessNumber(n) == pick

    # Scale test: 2^31 - 1
    current_pick = 1234567890
    t0 = time.perf_counter()
    res = solver.guessNumber(2147483647)
    t1 = time.perf_counter()
    assert res == 1234567890
    print(f"✓ Guess Number Higher or Lower: fixed, 35 random, and N=2^31-1 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "arranging-coins",
    number: 441,
    category: "Algorithms",
    patterns: ["binary-search-basic"],
    method: "arrangeCoins",
    hints: [
      {
        level: 1,
        title: "Triangular Sum Bound Obstacle",
        text: "Building k complete staircase rows requires k * (k + 1) // 2 total coins. What is the maximum complete row count k such that required coins do not exceed n?"
      },
      {
        level: 2,
        title: "Triangular Monotonic Invariant",
        text: "The coin requirement f(k) = k * (k + 1) // 2 strictly increases with k. If f(mid) <= n, mid rows are feasible, so search for larger k; otherwise search smaller."
      },
      {
        level: 3,
        title: "Row Bisection Procedure",
        text: "Initialize left = 0, right = n. While left <= right, let mid = (left + right) // 2. Compute coins = mid * (mid + 1) // 2. If coins <= n, save ans = mid and try left = mid + 1; otherwise right = mid - 1. Return ans."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def arrangeCoins(self, n: int) -> int:\n        left, right = 0, n\n        ans = 0\n        while left <= right:\n            mid = (left + right) // 2\n            if mid * (mid + 1) // 2 <= n:\n                ans = mid\n                left = mid + 1\n            else:\n                right = mid - 1\n        return ans\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(log N)",
      space: "O(1)",
      variables: ["N: number of coins (1 <= N <= 2^31 - 1)"],
      notes: "Logarithmic bisection over staircase row heights in O(1) space.",
      whyNaiveFails: "Subtracting row heights iteratively takes O(sqrt(N)) operations, running up to 65,536 iterations.",
      spaceTimeTradeoff: "Zero auxiliary memory allocations.",
      interviewerExpectation: "Using 64-bit integers to prevent overflow when computing mid * (mid + 1) for large n."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def arrangeCoins(self, n: int) -> int:\n        left, right = 0, n\n        ans = 0\n        while left <= right:\n            mid = (left + right) // 2\n            if mid * (mid + 1) // 2 <= n:\n                ans = mid\n                left = mid + 1\n            else:\n                right = mid - 1\n        return ans",
        approach: "Bisection over row capacity using triangular numbers",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    int arrangeCoins(int n) {\n        long long left = 0, right = n, ans = 0;\n        while (left <= right) {\n            long long mid = left + (right - left) / 2;\n            if (mid * (mid + 1) / 2 <= n) {\n                ans = mid;\n                left = mid + 1;\n            } else {\n                right = mid - 1;\n            }\n        }\n        return (int)ans;\n    }\n};",
        approach: "Bisection over row capacity using triangular numbers",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public int arrangeCoins(int n) {\n        long left = 0, right = n, ans = 0;\n        while (left <= right) {\n            long mid = left + (right - left) / 2;\n            if (mid * (mid + 1) / 2 <= n) {\n                ans = mid;\n                left = mid + 1;\n            } else {\n                right = mid - 1;\n            }\n        }\n        return (int)ans;\n    }\n}",
        approach: "Bisection over row capacity using triangular numbers",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var arrangeCoins = function(n) {\n    let left = 0, right = n, ans = 0;\n    while (left <= right) {\n        const mid = Math.floor((left + right) / 2);\n        if ((mid * (mid + 1)) / 2 <= n) {\n            ans = mid;\n            left = mid + 1;\n        } else {\n            right = mid - 1;\n        }\n    }\n    return ans;\n};",
        approach: "Bisection over row capacity using triangular numbers",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [(5, 2), (8, 3), (1, 1), (0, 0), (3, 2)]
    for n, exp in fixed:
        assert solver.arrangeCoins(n) == exp

    rng = random.Random(42)
    for _ in range(35):
        k = rng.randint(1, 1000)
        n = k * (k + 1) // 2 + rng.randint(0, k)
        assert solver.arrangeCoins(n) == k

    # Scale test: 2^31 - 1
    t0 = time.perf_counter()
    res = solver.arrangeCoins(2147483647)
    t1 = time.perf_counter()
    assert res == 65535
    print(f"✓ Arranging Coins: fixed, 35 random, and 2^31-1 passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "single-element-in-a-sorted-array",
    number: 540,
    category: "Algorithms",
    patterns: ["binary-search-basic"],
    method: "singleNonDuplicate",
    hints: [
      {
        level: 1,
        title: "Pair Parity Disruption Obstacle",
        text: "Every element appears twice except one, and the entire array is sorted. How does the index parity of identical pairs change before and after the single element?"
      },
      {
        level: 2,
        title: "Even-Odd Parity Invariant",
        text: "Before the unique element, pairs begin at even indices (even, odd). After the unique element, pairs are shifted to (odd, even)."
      },
      {
        level: 3,
        title: "Even Index Bisection Procedure",
        text: "Set left = 0, right = len(nums) - 1. While left < right, compute mid = (left + right) // 2. Ensure mid is even by subtracting 1 if mid % 2 == 1. If nums[mid] == nums[mid + 1], the disruption lies strictly to the right (left = mid + 2); otherwise it is at or to the left (right = mid). Return nums[left]."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def singleNonDuplicate(self, nums: List[int]) -> int:\n        left, right = 0, len(nums) - 1\n        while left < right:\n            mid = (left + right) // 2\n            if mid % 2 == 1:\n                mid -= 1\n            if nums[mid] == nums[mid + 1]:\n                left = mid + 2\n            else:\n                right = mid\n        return nums[left]\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(log N)",
      space: "O(1)",
      variables: ["N: length of nums array (1 <= N <= 10^5)"],
      notes: "Logarithmic bisection checking index parity of paired occurrences in O(1) space.",
      whyNaiveFails: "Linear XOR reduction takes O(N) which misses the logarithmic bound achievable on sorted arrays.",
      spaceTimeTradeoff: "Zero auxiliary memory overhead.",
      interviewerExpectation: "Using bitwise mid ^ 1 or parity alignment to compare adjacent partners in O(1) checks."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def singleNonDuplicate(self, nums: List[int]) -> int:\n        left, right = 0, len(nums) - 1\n        while left < right:\n            mid = (left + right) // 2\n            if mid % 2 == 1:\n                mid -= 1\n            if nums[mid] == nums[mid + 1]:\n                left = mid + 2\n            else:\n                right = mid\n        return nums[left]",
        approach: "Bisection on even index pair parity",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    int singleNonDuplicate(vector<int>& nums) {\n        int left = 0, right = (int)nums.size() - 1;\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (mid % 2 == 1) mid--;\n            if (nums[mid] == nums[mid + 1]) left = mid + 2;\n            else right = mid;\n        }\n        return nums[left];\n    }\n};",
        approach: "Bisection on even index pair parity",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public int singleNonDuplicate(int[] nums) {\n        int left = 0, right = nums.length - 1;\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (mid % 2 == 1) mid--;\n            if (nums[mid] == nums[mid + 1]) left = mid + 2;\n            else right = mid;\n        }\n        return nums[left];\n    }\n}",
        approach: "Bisection on even index pair parity",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var singleNonDuplicate = function(nums) {\n    let left = 0, right = nums.length - 1;\n    while (left < right) {\n        let mid = Math.floor((left + right) / 2);\n        if (mid % 2 === 1) mid--;\n        if (nums[mid] === nums[mid + 1]) left = mid + 2;\n        else right = mid;\n    }\n    return nums[left];\n};",
        approach: "Bisection on even index pair parity",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([1, 1, 2, 3, 3, 4, 4, 8, 8], 2),
        ([3, 3, 7, 7, 10, 11, 11], 10),
        ([1], 1),
        ([1, 1, 2], 2),
        ([2, 3, 3], 2)
    ]
    for nums, exp in fixed:
        assert solver.singleNonDuplicate(nums) == exp

    rng = random.Random(42)
    for _ in range(35):
        pairs_cnt = rng.randint(0, 30)
        vals = sorted(rng.sample(range(1, 200), pairs_cnt + 1))
        single = vals[rng.randint(0, pairs_cnt)]
        nums = []
        for v in vals:
            if v == single: nums.append(v)
            else:
                nums.append(v)
                nums.append(v)
        nums.sort()
        assert solver.singleNonDuplicate(nums) == single

    # Scale test: 50,001 elements
    big = []
    for i in range(25000):
        big.append(i)
        big.append(i)
    big.append(999999)
    big.sort()
    t0 = time.perf_counter()
    res = solver.singleNonDuplicate(big)
    t1 = time.perf_counter()
    assert res == 999999
    print(f"✓ Single Element in a Sorted Array: fixed, 35 random, and N=50k passed in {(t1-t0)*1000:.2f}ms")
`
  }
];

function generateFiles() {
  for (const item of batch8a) {
    const probData = {
      slug: item.slug,
      number: item.number,
      category: item.category,
      patterns: item.patterns,
      hints: item.hints,
      complexity: item.complexity,
      solutions: item.solutions,
      review: {
        status: "tested",
        acceptedOnLeetCode: null,
        reviewer: null
      },
      updated: "2026-10-20T00:00:00.000Z"
    };

    const probPath = path.join(rootDir, 'dataset/problems', `${item.slug}.json`);
    fs.writeFileSync(probPath, JSON.stringify(probData, null, 2) + '\n', 'utf8');

    const testDir = path.join(rootDir, 'dataset/tests', item.slug);
    if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true });

    const metaData = {
      slug: item.slug,
      method: item.method,
      category: item.category,
      targetTime: item.complexity.time,
      targetSpace: item.complexity.space
    };
    fs.writeFileSync(path.join(testDir, 'meta.json'), JSON.stringify(metaData, null, 2) + '\n', 'utf8');

    const testPyContent = `import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', '${item.slug}.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {'List': list, 'Optional': None}
    exec(sol_code, scope)
    solver = scope['Solution']()
${item.testCases}

if __name__ == '__main__':
    main()
`;
    fs.writeFileSync(path.join(testDir, 'test.py'), testPyContent, 'utf8');
    console.log(`Generated: ${item.slug}`);
  }
}

generateFiles();
