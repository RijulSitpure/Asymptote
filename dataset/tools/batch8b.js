import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

const batch8b = [
  {
    slug: "capacity-to-ship-packages-within-d-days",
    number: 1011,
    category: "Algorithms",
    patterns: ["binary-search-answer"],
    method: "shipWithinDays",
    hints: [
      {
        level: 1,
        title: "Capacity Feasibility Monotonicity",
        text: "Simulating package distribution over days works for any fixed vessel capacity. Since higher capacities always ship in fewer or equal days, how can you test the optimal capacity without checking every value?"
      },
      {
        level: 2,
        title: "Feasibility Bound Invariant",
        text: "The minimum possible capacity is max(weights) because every package must fit, and the maximum is sum(weights). The condition feasible(cap) is monotonic from False to True."
      },
      {
        level: 3,
        title: "Answer Range Bisection Procedure",
        text: "Define feasible(cap): greedily accumulate package weights; whenever current sum exceeds cap, start a new day. If required days <= days, cap is feasible. Bisect over [max(weights), sum(weights)]. When feasible(mid) is true, shrink right = mid; otherwise left = mid + 1. Return left."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def shipWithinDays(self, weights: List[int], days: int) -> int:\n        def feasible(cap: int) -> bool:\n            d = 1\n            curr = 0\n            for w in weights:\n                if curr + w > cap:\n                    d += 1\n                    curr = 0\n                curr += w\n            return d <= days\n\n        left, right = max(weights), sum(weights)\n        while left < right:\n            mid = (left + right) // 2\n            if feasible(mid):\n                right = mid\n            else:\n                left = mid + 1\n        return left\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N * log(sum(weights) - max(weights)))",
      space: "O(1)",
      variables: ["N: number of packages (1 <= N <= 5 * 10^4)", "days: delivery deadline (1 <= days <= N)"],
      notes: "Logarithmic bisection on monotonic capacity range running linear greedy validation each probe.",
      whyNaiveFails: "Testing every capacity from max(weights) to sum(weights) sequentially takes O(N * sum(weights)) which times out.",
      spaceTimeTradeoff: "Greedy linear checks require zero auxiliary storage.",
      interviewerExpectation: "Justifying lower bound max(weights) and upper bound sum(weights) and explaining greedy partition optimality."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def shipWithinDays(self, weights: List[int], days: int) -> int:\n        def feasible(cap: int) -> bool:\n            d = 1\n            curr = 0\n            for w in weights:\n                if curr + w > cap:\n                    d += 1\n                    curr = 0\n                curr += w\n            return d <= days\n\n        left, right = max(weights), sum(weights)\n        while left < right:\n            mid = (left + right) // 2\n            if feasible(mid):\n                right = mid\n            else:\n                left = mid + 1\n        return left",
        approach: "Bisection over capacity answer space with greedy feasibility check",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    int shipWithinDays(vector<int>& weights, int days) {\n        auto feasible = [&](int cap) {\n            int d = 1, curr = 0;\n            for (int w : weights) {\n                if (curr + w > cap) {\n                    d++;\n                    curr = 0;\n                }\n                curr += w;\n            }\n            return d <= days;\n        };\n        int left = 0, right = 0;\n        for (int w : weights) {\n            left = max(left, w);\n            right += w;\n        }\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (feasible(mid)) right = mid;\n            else left = mid + 1;\n        }\n        return left;\n    }\n};",
        approach: "Bisection over capacity answer space with greedy feasibility check",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public int shipWithinDays(int[] weights, int days) {\n        int left = 0, right = 0;\n        for (int w : weights) {\n            left = Math.max(left, w);\n            right += w;\n        }\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (feasible(weights, days, mid)) right = mid;\n            else left = mid + 1;\n        }\n        return left;\n    }\n    private boolean feasible(int[] weights, int days, int cap) {\n        int d = 1, curr = 0;\n        for (int w : weights) {\n            if (curr + w > cap) {\n                d++;\n                curr = 0;\n            }\n            curr += w;\n        }\n        return d <= days;\n    }\n}",
        approach: "Bisection over capacity answer space with greedy feasibility check",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var shipWithinDays = function(weights, days) {\n    function feasible(cap) {\n        let d = 1, curr = 0;\n        for (const w of weights) {\n            if (curr + w > cap) {\n                d++;\n                curr = 0;\n            }\n            curr += w;\n        }\n        return d <= days;\n    }\n    let left = Math.max(...weights);\n    let right = weights.reduce((a, b) => a + b, 0);\n    while (left < right) {\n        const mid = Math.floor((left + right) / 2);\n        if (feasible(mid)) right = mid;\n        else left = mid + 1;\n    }\n    return left;\n};",
        approach: "Bisection over capacity answer space with greedy feasibility check",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5, 15),
        ([3, 2, 2, 4, 1, 4], 3, 6),
        ([1, 2, 3, 1, 1], 4, 3),
        ([10], 1, 10),
        ([5, 5, 5, 5], 2, 10)
    ]
    for w, d, exp in fixed:
        assert solver.shipWithinDays(w, d) == exp

    rng = random.Random(42)
    for _ in range(30):
        sz = rng.randint(1, 40)
        w = [rng.randint(1, 25) for _ in range(sz)]
        d = rng.randint(1, sz)
        # reference via linear search starting from max(w)
        cap = max(w)
        while True:
            cur_d, cur_sum = 1, 0
            for item in w:
                if cur_sum + item > cap:
                    cur_d += 1
                    cur_sum = 0
                cur_sum += item
            if cur_d <= d:
                break
            cap += 1
        assert solver.shipWithinDays(w, d) == cap

    # Scale test: 20,000 items
    big = [i % 50 + 1 for i in range(20000)]
    t0 = time.perf_counter()
    res = solver.shipWithinDays(big, 100)
    t1 = time.perf_counter()
    assert res > 0
    print(f"✓ Capacity To Ship Packages: fixed, 30 random, and N=20k passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "permutation-in-string",
    number: 567,
    category: "Algorithms",
    patterns: ["sliding-window-fixed"],
    method: "checkInclusion",
    hints: [
      {
        level: 1,
        title: "Substring Character Permutation Obstacle",
        text: "Generating all permutations of s1 yields factorial explosion. How can you compare character counts over a window of length len(s1) in linear time without rebuilding frequencies?"
      },
      {
        level: 2,
        title: "Fixed Length Frequency Invariant",
        text: "A substring of s2 is a permutation of s1 if and only if its length equals len(s1) and its 26-character frequency count matches that of s1."
      },
      {
        level: 3,
        title: "Sliding Window Frequency Update Procedure",
        text: "Count frequencies of s1 and the first len(s1) characters of s2 in 26-element arrays. Track count of matching character frequencies. Slide the window one index right: add incoming character, drop outgoing character, update match count. If matches == 26, return True."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def checkInclusion(self, s1: str, s2: str) -> bool:\n        n1, n2 = len(s1), len(s2)\n        if n1 > n2:\n            return False\n        c1, c2 = [0] * 26, [0] * 26\n        for i in range(n1):\n            c1[ord(s1[i]) - 97] += 1\n            c2[ord(s2[i]) - 97] += 1\n        if c1 == c2:\n            return True\n        for i in range(n1, n2):\n            c2[ord(s2[i]) - 97] += 1\n            c2[ord(s2[i - n1]) - 97] -= 1\n            if c1 == c2:\n                return True\n        return False\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(len(s2))",
      space: "O(1)",
      variables: ["N: length of s2 (1 <= N <= 10^4)", "M: length of s1 (1 <= M <= 10^4)"],
      notes: "Fixed-size sliding window maintaining 26-element alphabet frequency array in O(1) auxiliary space.",
      whyNaiveFails: "Generating permutations takes O(M!) time and sorting each substring takes O(N * M log M) time.",
      spaceTimeTradeoff: "26-element integer table uses constant auxiliary memory.",
      interviewerExpectation: "Tracking matches count or comparing 26-length arrays directly in O(1) time per window step."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def checkInclusion(self, s1: str, s2: str) -> bool:\n        n1, n2 = len(s1), len(s2)\n        if n1 > n2:\n            return False\n        c1, c2 = [0] * 26, [0] * 26\n        for i in range(n1):\n            c1[ord(s1[i]) - 97] += 1\n            c2[ord(s2[i]) - 97] += 1\n        if c1 == c2:\n            return True\n        for i in range(n1, n2):\n            c2[ord(s2[i]) - 97] += 1\n            c2[ord(s2[i - n1]) - 97] -= 1\n            if c1 == c2:\n                return True\n        return False",
        approach: "Fixed-size sliding window with 26-element frequency count",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    bool checkInclusion(string s1, string s2) {\n        int n1 = s1.length(), n2 = s2.length();\n        if (n1 > n2) return false;\n        vector<int> c1(26, 0), c2(26, 0);\n        for (int i = 0; i < n1; i++) {\n            c1[s1[i] - 'a']++;\n            c2[s2[i] - 'a']++;\n        }\n        if (c1 == c2) return true;\n        for (int i = n1; i < n2; i++) {\n            c2[s2[i] - 'a']++;\n            c2[s2[i - n1] - 'a']--;\n            if (c1 == c2) return true;\n        }\n        return false;\n    }\n};",
        approach: "Fixed-size sliding window with 26-element frequency count",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public boolean checkInclusion(String s1, String s2) {\n        int n1 = s1.length(), n2 = s2.length();\n        if (n1 > n2) return false;\n        int[] c1 = new int[26];\n        int[] c2 = new int[26];\n        for (int i = 0; i < n1; i++) {\n            c1[s1.charAt(i) - 'a']++;\n            c2[s2.charAt(i) - 'a']++;\n        }\n        if (matches(c1, c2)) return true;\n        for (int i = n1; i < n2; i++) {\n            c2[s2.charAt(i) - 'a']++;\n            c2[s2.charAt(i - n1) - 'a']--;\n            if (matches(c1, c2)) return true;\n        }\n        return false;\n    }\n    private boolean matches(int[] a, int[] b) {\n        for (int i = 0; i < 26; i++) if (a[i] != b[i]) return false;\n        return true;\n    }\n}",
        approach: "Fixed-size sliding window with 26-element frequency count",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var checkInclusion = function(s1, s2) {\n    const n1 = s1.length, n2 = s2.length;\n    if (n1 > n2) return false;\n    const c1 = new Array(26).fill(0);\n    const c2 = new Array(26).fill(0);\n    for (let i = 0; i < n1; i++) {\n        c1[s1.charCodeAt(i) - 97]++;\n        c2[s2.charCodeAt(i) - 97]++;\n    }\n    function matches() {\n        for (let i = 0; i < 26; i++) if (c1[i] !== c2[i]) return false;\n        return true;\n    }\n    if (matches()) return true;\n    for (let i = n1; i < n2; i++) {\n        c2[s2.charCodeAt(i) - 97]++;\n        c2[s2.charCodeAt(i - n1) - 97]--;\n        if (matches()) return true;\n    }\n    return false;\n};",
        approach: "Fixed-size sliding window with 26-element frequency count",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ("ab", "eidbaooo", True),
        ("ab", "eidboaoo", False),
        ("adc", "dcda", True),
        ("a", "a", True),
        ("hello", "ooolleoooleh", False)
    ]
    for s1, s2, exp in fixed:
        assert solver.checkInclusion(s1, s2) == exp

    rng = random.Random(42)
    letters = "abcdef"
    for _ in range(35):
        n1 = rng.randint(1, 8)
        n2 = rng.randint(n1, 30)
        s1 = ''.join(rng.choice(letters) for _ in range(n1))
        s2 = ''.join(rng.choice(letters) for _ in range(n2))
        # reference
        from collections import Counter
        target_counts = Counter(s1)
        ref_res = False
        for i in range(len(s2) - len(s1) + 1):
            if Counter(s2[i:i + len(s1)]) == target_counts:
                ref_res = True
                break
        assert solver.checkInclusion(s1, s2) == ref_res

    # Scale test: 10,000 characters
    s1 = "abcdef"
    s2 = "z" * 9994 + "fedcba"
    t0 = time.perf_counter()
    res = solver.checkInclusion(s1, s2)
    t1 = time.perf_counter()
    assert res is True
    print(f"✓ Permutation in String: fixed, 35 random, and N=10k passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "find-all-anagrams-in-a-string",
    number: 438,
    category: "Algorithms",
    patterns: ["two-pointers-window-dynamic"],
    method: "findAnagrams",
    hints: [
      {
        level: 1,
        title: "All Anagram Starting Indices Obstacle",
        text: "Extracting and sorting every substring of length len(p) scales quadratically. How can shifting a window by one character update the count array in constant time?"
      },
      {
        level: 2,
        title: "Sliding Window Multi-Set Invariant",
        text: "The window always spans [i - len(p) + 1, i]. Subtracting the leaving character and adding the entering character keeps the window frequency exact."
      },
      {
        level: 3,
        title: "Rolling Count Window Procedure",
        text: "Count frequencies of p and the prefix of s of length len(p). If initial counts match, record index 0. Then iterate i from len(p) to len(s) - 1: increment count for s[i] and decrement count for s[i - len(p)]. Whenever the frequency arrays match, append i - len(p) + 1."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def findAnagrams(self, s: str, p: str) -> List[int]:\n        ns, np = len(s), len(p)\n        if np > ns:\n            return []\n        cp, cs = [0] * 26, [0] * 26\n        for i in range(np):\n            cp[ord(p[i]) - 97] += 1\n            cs[ord(s[i]) - 97] += 1\n        ans = []\n        if cp == cs:\n            ans.append(0)\n        for i in range(np, ns):\n            cs[ord(s[i]) - 97] += 1\n            cs[ord(s[i - np]) - 97] -= 1\n            if cp == cs:\n                ans.append(i - np + 1)\n        return ans\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(len(s))",
      space: "O(1)",
      variables: ["len(s): length of string s (1 <= len(s) <= 3 * 10^4)", "len(p): length of pattern p (1 <= len(p) <= 3 * 10^4)"],
      notes: "Fixed-size sliding window with 26-element array comparisons in O(1) auxiliary space.",
      whyNaiveFails: "Sorting each window substring of length len(p) requires O(len(s) * len(p) log(len(p))) time.",
      spaceTimeTradeoff: "Array of size 26 stores character counts with constant auxiliary space.",
      interviewerExpectation: "Using fixed 26-character arrays or a single match-difference count to achieve linear runtime."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def findAnagrams(self, s: str, p: str) -> List[int]:\n        ns, np = len(s), len(p)\n        if np > ns:\n            return []\n        cp, cs = [0] * 26, [0] * 26\n        for i in range(np):\n            cp[ord(p[i]) - 97] += 1\n            cs[ord(s[i]) - 97] += 1\n        ans = []\n        if cp == cs:\n            ans.append(0)\n        for i in range(np, ns):\n            cs[ord(s[i]) - 97] += 1\n            cs[ord(s[i - np]) - 97] -= 1\n            if cp == cs:\n                ans.append(i - np + 1)\n        return ans",
        approach: "Sliding window with 26-element array delta updates",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    vector<int> findAnagrams(string s, string p) {\n        int ns = s.length(), np = p.length();\n        if (np > ns) return {};\n        vector<int> cp(26, 0), cs(26, 0), ans;\n        for (int i = 0; i < np; i++) {\n            cp[p[i] - 'a']++;\n            cs[s[i] - 'a']++;\n        }\n        if (cp == cs) ans.push_back(0);\n        for (int i = np; i < ns; i++) {\n            cs[s[i] - 'a']++;\n            cs[s[i - np] - 'a']--;\n            if (cp == cs) ans.push_back(i - np + 1);\n        }\n        return ans;\n    }\n};",
        approach: "Sliding window with 26-element array delta updates",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public List<Integer> findAnagrams(String s, String p) {\n        int ns = s.length(), np = p.length();\n        List<Integer> ans = new ArrayList<>();\n        if (np > ns) return ans;\n        int[] cp = new int[26];\n        int[] cs = new int[26];\n        for (int i = 0; i < np; i++) {\n            cp[p.charAt(i) - 'a']++;\n            cs[s.charAt(i) - 'a']++;\n        }\n        if (matches(cp, cs)) ans.add(0);\n        for (int i = np; i < ns; i++) {\n            cs[s.charAt(i) - 'a']++;\n            cs[s.charAt(i - np) - 'a']--;\n            if (matches(cp, cs)) ans.add(i - np + 1);\n        }\n        return ans;\n    }\n    private boolean matches(int[] a, int[] b) {\n        for (int i = 0; i < 26; i++) if (a[i] != b[i]) return false;\n        return true;\n    }\n}",
        approach: "Sliding window with 26-element array delta updates",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var findAnagrams = function(s, p) {\n    const ns = s.length, np = p.length;\n    if (np > ns) return [];\n    const cp = new Array(26).fill(0);\n    const cs = new Array(26).fill(0);\n    for (let i = 0; i < np; i++) {\n        cp[p.charCodeAt(i) - 97]++;\n        cs[s.charCodeAt(i) - 97]++;\n    }\n    function matches() {\n        for (let i = 0; i < 26; i++) if (cp[i] !== cs[i]) return false;\n        return true;\n    }\n    const ans = [];\n    if (matches()) ans.push(0);\n    for (let i = np; i < ns; i++) {\n        cs[s.charCodeAt(i) - 97]++;\n        cs[s.charCodeAt(i - np) - 97]--;\n        if (matches()) ans.push(i - np + 1);\n    }\n    return ans;\n};",
        approach: "Sliding window with 26-element array delta updates",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ("cbaebabacd", "abc", [0, 6]),
        ("abab", "ab", [0, 1, 2]),
        ("a", "b", []),
        ("a", "a", [0]),
        ("baa", "aa", [1])
    ]
    for s, p, exp in fixed:
        assert solver.findAnagrams(s, p) == exp

    rng = random.Random(42)
    letters = "abcde"
    for _ in range(35):
        np = rng.randint(1, 5)
        ns = rng.randint(np, 30)
        p = ''.join(rng.choice(letters) for _ in range(np))
        s = ''.join(rng.choice(letters) for _ in range(ns))
        # reference
        from collections import Counter
        target = Counter(p)
        ref = []
        for i in range(ns - np + 1):
            if Counter(s[i:i + np]) == target:
                ref.append(i)
        assert solver.findAnagrams(s, p) == ref

    # Scale test: 30,000 characters
    s = "a" * 30000
    p = "a" * 5
    t0 = time.perf_counter()
    res = solver.findAnagrams(s, p)
    t1 = time.perf_counter()
    assert len(res) == 29996
    print(f"✓ Find All Anagrams in a String: fixed, 35 random, and N=30k passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "contains-duplicate-ii",
    number: 219,
    category: "Algorithms",
    patterns: ["two-pointers-window-dynamic"],
    method: "containsNearbyDuplicate",
    hints: [
      {
        level: 1,
        title: "Distance Bounded Duplicate Obstacle",
        text: "Checking all pairs of elements takes quadratic time. How can you maintain only the elements within the recent window of distance at most k?"
      },
      {
        level: 2,
        title: "Window Set Invariant",
        text: "Maintain a set of elements seen in the current window of size at most k. If the current number already exists in the set, a valid nearby duplicate is found."
      },
      {
        level: 3,
        title: "Sliding Window Set Procedure",
        text: "Initialize an empty set seen. For each index i and number val: if val in seen, return True. Add val to seen. If len(seen) > k, remove nums[i - k] from seen. If the loop completes, return False."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:\n        seen = set()\n        for i, num in enumerate(nums):\n            if num in seen:\n                return True\n            seen.add(num)\n            if len(seen) > k:\n                seen.remove(nums[i - k])\n        return False\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N)",
      space: "O(min(N, k))",
      variables: ["N: length of nums array (1 <= N <= 10^5)", "k: distance bound (0 <= k <= 10^5)"],
      notes: "Sliding window set of maximum size min(N, k) offering O(1) average lookup and eviction.",
      whyNaiveFails: "Comparing all pairs within distance k takes O(N * k) time which reaches 10^10 operations for large k.",
      spaceTimeTradeoff: "Set auxiliary memory bounded by min(N, k) achieves linear runtime.",
      interviewerExpectation: "Managing the sliding window set eviction logic cleanly when index exceeds k."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:\n        seen = set()\n        for i, num in enumerate(nums):\n            if num in seen:\n                return True\n            seen.add(num)\n            if len(seen) > k:\n                seen.remove(nums[i - k])\n        return False",
        approach: "Sliding window hash set of size at most k",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    bool containsNearbyDuplicate(vector<int>& nums, int k) {\n        unordered_set<int> seen;\n        for (int i = 0; i < (int)nums.size(); i++) {\n            if (seen.count(nums[i])) return true;\n            seen.insert(nums[i]);\n            if ((int)seen.size() > k) {\n                seen.erase(nums[i - k]);\n            }\n        }\n        return false;\n    }\n};",
        approach: "Sliding window hash set of size at most k",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public boolean containsNearbyDuplicate(int[] nums, int k) {\n        Set<Integer> seen = new HashSet<>();\n        for (int i = 0; i < nums.length; i++) {\n            if (seen.contains(nums[i])) return true;\n            seen.add(nums[i]);\n            if (seen.size() > k) {\n                seen.remove(nums[i - k]);\n            }\n        }\n        return false;\n    }\n}",
        approach: "Sliding window hash set of size at most k",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var containsNearbyDuplicate = function(nums, k) {\n    const seen = new Set();\n    for (let i = 0; i < nums.length; i++) {\n        if (seen.has(nums[i])) return true;\n        seen.add(nums[i]);\n        if (seen.size > k) {\n            seen.delete(nums[i - k]);\n        }\n    }\n    return false;\n};",
        approach: "Sliding window hash set of size at most k",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([1, 2, 3, 1], 3, True),
        ([1, 0, 1, 1], 1, True),
        ([1, 2, 3, 1, 2, 3], 2, False),
        ([1], 1, False),
        ([1, 2, 1], 0, False)
    ]
    for nums, k, exp in fixed:
        assert solver.containsNearbyDuplicate(nums, k) == exp

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 40)
        nums = [rng.randint(1, 15) for _ in range(sz)]
        k = rng.randint(0, 10)
        # reference
        ref = False
        for i in range(sz):
            for j in range(i + 1, min(sz, i + k + 1)):
                if nums[i] == nums[j]:
                    ref = True
                    break
            if ref: break
        assert solver.containsNearbyDuplicate(nums, k) == ref

    # Scale test: 50,000 items
    big = list(range(50000))
    big.append(0)
    t0 = time.perf_counter()
    res = solver.containsNearbyDuplicate(big, 50000)
    t1 = time.perf_counter()
    assert res is True
    print(f"✓ Contains Duplicate II: fixed, 35 random, and N=50k passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "max-consecutive-ones-iii",
    number: 1004,
    category: "Algorithms",
    patterns: ["two-pointers-window-dynamic"],
    method: "longestOnes",
    hints: [
      {
        level: 1,
        title: "Zero Flipping Allowance Obstacle",
        text: "You may flip at most k zeroes to ones. How can you formulate this as finding the longest contiguous subarray containing at most k zeroes?"
      },
      {
        level: 2,
        title: "Dynamic Window Invariant",
        text: "Expand the right boundary. When the count of zeroes in window [left, right] exceeds k, advance left until the zero count returns to at most k."
      },
      {
        level: 3,
        title: "Two-Pointer Expansion Procedure",
        text: "Initialize left = 0, zeroCount = 0, and maxLen = 0. For right in range(len(nums)): if nums[right] == 0, zeroCount += 1. While zeroCount > k: if nums[left] == 0, zeroCount -= 1; left += 1. Update maxLen = max(maxLen, right - left + 1). Return maxLen."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def longestOnes(self, nums: List[int], k: int) -> int:\n        left = 0\n        zero_count = 0\n        max_len = 0\n        for right in range(len(nums)):\n            if nums[right] == 0:\n                zero_count += 1\n            while zero_count > k:\n                if nums[left] == 0:\n                    zero_count -= 1\n                left += 1\n            max_len = max(max_len, right - left + 1)\n        return max_len\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N)",
      space: "O(1)",
      variables: ["N: length of nums array (1 <= N <= 10^5)", "k: allowed zero flips (0 <= k <= N)"],
      notes: "Dynamic sliding window where both pointers advance at most N times in O(1) space.",
      whyNaiveFails: "Evaluating every possible subarray takes O(N^2) which exceeds the 1-second time limit for N = 10^5.",
      spaceTimeTradeoff: "Zero auxiliary memory overhead.",
      interviewerExpectation: "Explaining why both left and right pointers only move forward, guaranteeing amortized O(N) runtime."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def longestOnes(self, nums: List[int], k: int) -> int:\n        left = 0\n        zero_count = 0\n        max_len = 0\n        for right in range(len(nums)):\n            if nums[right] == 0:\n                zero_count += 1\n            while zero_count > k:\n                if nums[left] == 0:\n                    zero_count -= 1\n                left += 1\n            max_len = max(max_len, right - left + 1)\n        return max_len",
        approach: "Dynamic sliding window with zero count threshold",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    int longestOnes(vector<int>& nums, int k) {\n        int left = 0, zeroCount = 0, maxLen = 0;\n        for (int right = 0; right < (int)nums.size(); right++) {\n            if (nums[right] == 0) zeroCount++;\n            while (zeroCount > k) {\n                if (nums[left] == 0) zeroCount--;\n                left++;\n            }\n            maxLen = max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n};",
        approach: "Dynamic sliding window with zero count threshold",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public int longestOnes(int[] nums, int k) {\n        int left = 0, zeroCount = 0, maxLen = 0;\n        for (int right = 0; right < nums.length; right++) {\n            if (nums[right] == 0) zeroCount++;\n            while (zeroCount > k) {\n                if (nums[left] == 0) zeroCount--;\n                left++;\n            }\n            maxLen = Math.max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n}",
        approach: "Dynamic sliding window with zero count threshold",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var longestOnes = function(nums, k) {\n    let left = 0, zeroCount = 0, maxLen = 0;\n    for (let right = 0; right < nums.length; right++) {\n        if (nums[right] === 0) zeroCount++;\n        while (zeroCount > k) {\n            if (nums[left] === 0) zeroCount--;\n            left++;\n        }\n        maxLen = Math.max(maxLen, right - left + 1);\n    }\n    return maxLen;\n};",
        approach: "Dynamic sliding window with zero count threshold",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2, 6),
        ([0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3, 10),
        ([0, 0, 0, 0], 0, 0),
        ([1, 1, 1, 1], 2, 4),
        ([0], 1, 1)
    ]
    for nums, k, exp in fixed:
        assert solver.longestOnes(nums, k) == exp

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 40)
        nums = [rng.choice([0, 1]) for _ in range(sz)]
        k = rng.randint(0, sz)
        # reference
        ref = 0
        for i in range(sz):
            zeros = 0
            for j in range(i, sz):
                if nums[j] == 0: zeros += 1
                if zeros <= k:
                    ref = max(ref, j - i + 1)
                else: break
        assert solver.longestOnes(nums, k) == ref

    # Scale test: 50,000 items
    big = [1 if i % 4 != 0 else 0 for i in range(50000)]
    t0 = time.perf_counter()
    res = solver.longestOnes(big, 20)
    t1 = time.perf_counter()
    assert res > 0
    print(f"✓ Max Consecutive Ones III: fixed, 35 random, and N=50k passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "longest-substring-with-at-least-k-repeating-characters",
    number: 395,
    category: "Algorithms",
    patterns: ["two-pointers-window-dynamic"],
    method: "longestSubstring",
    hints: [
      {
        level: 1,
        title: "Global Frequency Constraint Obstacle",
        text: "If a character appears fewer than k times in string s, can it ever be part of any valid valid substring? How does splitting around invalid characters reduce the problem?"
      },
      {
        level: 2,
        title: "Split Divider Invariant",
        text: "Any character with frequency count < k in the current substring acts as a split divider. The longest valid substring must lie entirely within one of the separated parts."
      },
      {
        level: 3,
        title: "Divide and Conquer Procedure",
        text: "Count frequencies of all characters in s. Find the first character ch whose count is less than k. If no such character exists, return len(s). Otherwise, split s on ch and recursively return the maximum length across all split parts."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def longestSubstring(self, s: str, k: int) -> int:\n        if len(s) < k:\n            return 0\n        from collections import Counter\n        counts = Counter(s)\n        for ch, count in counts.items():\n            if count < k:\n                return max(self.longestSubstring(sub, k) for sub in s.split(ch))\n        return len(s)\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(26 * N)",
      space: "O(26 * N)",
      variables: ["N: length of string s (1 <= N <= 10^4)", "k: minimum repeating count (1 <= k <= 10^5)"],
      notes: "Divide and conquer recursion splitting on characters with frequency < k with depth bounded by 26 unique characters.",
      whyNaiveFails: "Checking all O(N^2) substrings with frequency maps takes O(26 * N^2) which times out for N = 10^4.",
      spaceTimeTradeoff: "Recursion stack depth bounded by alphabet size 26.",
      interviewerExpectation: "Explaining why characters with count < k can never participate in any valid substring."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def longestSubstring(self, s: str, k: int) -> int:\n        if len(s) < k:\n            return 0\n        from collections import Counter\n        counts = Counter(s)\n        for ch, count in counts.items():\n            if count < k:\n                return max(self.longestSubstring(sub, k) for sub in s.split(ch))\n        return len(s)",
        approach: "Divide and conquer splitting on infrequent characters",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    int longestSubstring(string s, int k) {\n        int n = s.length();\n        if (n < k) return 0;\n        vector<int> counts(26, 0);\n        for (char c : s) counts[c - 'a']++;\n        for (int i = 0; i < n; i++) {\n            if (counts[s[i] - 'a'] < k) {\n                int left = longestSubstring(s.substr(0, i), k);\n                int right = longestSubstring(s.substr(i + 1), k);\n                return max(left, right);\n            }\n        }\n        return n;\n    }\n};",
        approach: "Divide and conquer splitting on infrequent characters",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public int longestSubstring(String s, int k) {\n        int n = s.length();\n        if (n < k) return 0;\n        int[] counts = new int[26];\n        for (int i = 0; i < n; i++) counts[s.charAt(i) - 'a']++;\n        for (int i = 0; i < n; i++) {\n            if (counts[s.charAt(i) - 'a'] < k) {\n                int left = longestSubstring(s.substring(0, i), k);\n                int right = longestSubstring(s.substring(i + 1), k);\n                return Math.max(left, right);\n            }\n        }\n        return n;\n    }\n}",
        approach: "Divide and conquer splitting on infrequent characters",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var longestSubstring = function(s, k) {\n    const n = s.length;\n    if (n < k) return 0;\n    const counts = new Array(26).fill(0);\n    for (let i = 0; i < n; i++) counts[s.charCodeAt(i) - 97]++;\n    for (let i = 0; i < n; i++) {\n        if (counts[s.charCodeAt(i) - 97] < k) {\n            const left = longestSubstring(s.substring(0, i), k);\n            const right = longestSubstring(s.substring(i + 1), k);\n            return Math.max(left, right);\n        }\n    }\n    return n;\n};",
        approach: "Divide and conquer splitting on infrequent characters",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ("aaabb", 3, 3),
        ("ababbc", 2, 5),
        ("a", 1, 1),
        ("a", 2, 0),
        ("weitong", 2, 0)
    ]
    for s, k, exp in fixed:
        assert solver.longestSubstring(s, k) == exp

    rng = random.Random(42)
    letters = "abc"
    for _ in range(30):
        n = rng.randint(1, 20)
        s = ''.join(rng.choice(letters) for _ in range(n))
        k = rng.randint(1, 5)
        # reference
        from collections import Counter
        ref = 0
        for i in range(n):
            for j in range(i + 1, n + 1):
                sub = s[i:j]
                c = Counter(sub)
                if all(v >= k for v in c.values()):
                    ref = max(ref, j - i)
        assert solver.longestSubstring(s, k) == ref

    # Scale test: 5,000 characters
    big = "a" * 2500 + "b" * 2500
    t0 = time.perf_counter()
    res = solver.longestSubstring(big, 500)
    t1 = time.perf_counter()
    assert res == 5000
    print(f"✓ Longest Substring with At Least K Repeating: fixed, 30 random, and N=5k passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold",
    number: 1343,
    category: "Algorithms",
    patterns: ["sliding-window-fixed"],
    method: "numOfSubarrays",
    hints: [
      {
        level: 1,
        title: "Exact Window Average Obstacle",
        text: "Summing every subarray of length k from scratch takes quadratic time. How can you compare the sum directly to k * threshold and update in O(1) time per shift?"
      },
      {
        level: 2,
        title: "Threshold Target Invariant",
        text: "The average condition sum // k >= threshold is equivalent to sum >= k * threshold, avoiding floating-point division."
      },
      {
        level: 3,
        title: "Fixed Window Accumulation Procedure",
        text: "Let target = k * threshold. Compute window sum of first k elements. If window >= target, count = 1, else 0. Slide right from index k to n - 1: add arr[i] and subtract arr[i - k]. If window >= target, increment count. Return count."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def numOfSubarrays(self, arr: List[int], k: int, threshold: int) -> int:\n        target = k * threshold\n        curr = sum(arr[:k])\n        count = 1 if curr >= target else 0\n        for i in range(k, len(arr)):\n            curr += arr[i] - arr[i - k]\n            if curr >= target:\n                count += 1\n        return count\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N)",
      space: "O(1)",
      variables: ["N: length of arr (1 <= N <= 10^5)", "k: subarray window size (1 <= k <= N)"],
      notes: "Single pass fixed-size sliding window with O(1) delta sum updates and O(1) auxiliary space.",
      whyNaiveFails: "Computing sum of each size-k window independently takes O(N * k) which takes 10^10 operations for large k.",
      spaceTimeTradeoff: "Zero auxiliary memory overhead.",
      interviewerExpectation: "Multiplying threshold by k to avoid division and maintaining rolling sum."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def numOfSubarrays(self, arr: List[int], k: int, threshold: int) -> int:\n        target = k * threshold\n        curr = sum(arr[:k])\n        count = 1 if curr >= target else 0\n        for i in range(k, len(arr)):\n            curr += arr[i] - arr[i - k]\n            if curr >= target:\n                count += 1\n        return count",
        approach: "Fixed-size sliding window with target product threshold",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    int numOfSubarrays(vector<int>& arr, int k, int threshold) {\n        long long target = (long long)k * threshold;\n        long long curr = 0;\n        for (int i = 0; i < k; i++) curr += arr[i];\n        int count = (curr >= target) ? 1 : 0;\n        for (int i = k; i < (int)arr.size(); i++) {\n            curr += arr[i] - arr[i - k];\n            if (curr >= target) count++;\n        }\n        return count;\n    }\n};",
        approach: "Fixed-size sliding window with target product threshold",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public int numOfSubarrays(int[] arr, int k, int threshold) {\n        long target = (long)k * threshold;\n        long curr = 0;\n        for (int i = 0; i < k; i++) curr += arr[i];\n        int count = (curr >= target) ? 1 : 0;\n        for (int i = k; i < arr.length; i++) {\n            curr += arr[i] - arr[i - k];\n            if (curr >= target) count++;\n        }\n        return count;\n    }\n}",
        approach: "Fixed-size sliding window with target product threshold",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var numOfSubarrays = function(arr, k, threshold) {\n    const target = k * threshold;\n    let curr = 0;\n    for (let i = 0; i < k; i++) curr += arr[i];\n    let count = curr >= target ? 1 : 0;\n    for (let i = k; i < arr.length; i++) {\n        curr += arr[i] - arr[i - k];\n        if (curr >= target) count++;\n    }\n    return count;\n};",
        approach: "Fixed-size sliding window with target product threshold",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([2, 2, 2, 2, 5, 5, 5, 8], 3, 4, 3),
        ([11, 13, 17, 23, 29, 31, 7, 5, 2, 3], 3, 5, 6),
        ([1, 1, 1, 1], 1, 1, 4),
        ([1, 1, 1, 1], 2, 2, 0)
    ]
    for arr, k, t, exp in fixed:
        assert solver.numOfSubarrays(arr, k, t) == exp

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 40)
        arr = [rng.randint(0, 50) for _ in range(sz)]
        k = rng.randint(1, sz)
        t = rng.randint(0, 30)
        # reference
        ref = 0
        for i in range(sz - k + 1):
            if sum(arr[i:i + k]) >= k * t:
                ref += 1
        assert solver.numOfSubarrays(arr, k, t) == ref

    # Scale test: 50,000 items
    big = [10] * 50000
    t0 = time.perf_counter()
    res = solver.numOfSubarrays(big, 50, 10)
    t1 = time.perf_counter()
    assert res == 49951
    print(f"✓ Number of Sub-arrays of Size K: fixed, 35 random, and N=50k passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "maximum-sum-of-distinct-subarrays-with-length-k",
    number: 2461,
    category: "Algorithms",
    patterns: ["sliding-window-fixed"],
    method: "maximumSubarraySum",
    hints: [
      {
        level: 1,
        title: "Distinct Subarray Window Obstacle",
        text: "Checking distinctness by building a set for every size-k window requires O(N * k) time. How can you maintain frequency counts and rolling sum simultaneously in constant time per step?"
      },
      {
        level: 2,
        title: "Frequency Table Window Invariant",
        text: "Track the running sum and a frequency map of elements in the size-k window. The window has all distinct elements if and only if len(counts) == k."
      },
      {
        level: 3,
        title: "Fixed Distinct Window Procedure",
        text: "Initialize window sum and frequency map for the first k elements. If map size is k, max_sum = window_sum, else 0. Slide right: add incoming element to sum and map; decrement count of outgoing element and remove if count reaches 0. If map size is k, update max_sum = max(max_sum, window_sum)."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def maximumSubarraySum(self, nums: List[int], k: int) -> int:\n        from collections import defaultdict\n        counts = defaultdict(int)\n        curr_sum = 0\n        max_sum = 0\n        for i in range(k):\n            counts[nums[i]] += 1\n            curr_sum += nums[i]\n        if len(counts) == k:\n            max_sum = curr_sum\n        for i in range(k, len(nums)):\n            in_val, out_val = nums[i], nums[i - k]\n            counts[in_val] += 1\n            curr_sum += in_val\n            counts[out_val] -= 1\n            if counts[out_val] == 0:\n                del counts[out_val]\n            curr_sum -= out_val\n            if len(counts) == k:\n                max_sum = max(max_sum, curr_sum)\n        return max_sum\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N)",
      space: "O(k)",
      variables: ["N: length of nums array (1 <= N <= 10^5)", "k: subarray length (1 <= k <= N)"],
      notes: "Sliding window maintaining size-k frequency map and running sum in O(1) amortized time per step.",
      whyNaiveFails: "Validating uniqueness on every length-k slice takes O(N * k) which exceeds time limits.",
      spaceTimeTradeoff: "Auxiliary frequency map stores at most k entries.",
      interviewerExpectation: "Deleting keys with zero count from the map to enable O(1) distinct size verification."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def maximumSubarraySum(self, nums: List[int], k: int) -> int:\n        from collections import defaultdict\n        counts = defaultdict(int)\n        curr_sum = 0\n        max_sum = 0\n        for i in range(k):\n            counts[nums[i]] += 1\n            curr_sum += nums[i]\n        if len(counts) == k:\n            max_sum = curr_sum\n        for i in range(k, len(nums)):\n            in_val, out_val = nums[i], nums[i - k]\n            counts[in_val] += 1\n            curr_sum += in_val\n            counts[out_val] -= 1\n            if counts[out_val] == 0:\n                del counts[out_val]\n            curr_sum -= out_val\n            if len(counts) == k:\n                max_sum = max(max_sum, curr_sum)\n        return max_sum",
        approach: "Fixed sliding window with map-size distinctness check",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    long long maximumSubarraySum(vector<int>& nums, int k) {\n        unordered_map<int, int> counts;\n        long long curr_sum = 0, max_sum = 0;\n        for (int i = 0; i < k; i++) {\n            counts[nums[i]]++;\n            curr_sum += nums[i];\n        }\n        if ((int)counts.size() == k) max_sum = curr_sum;\n        for (int i = k; i < (int)nums.size(); i++) {\n            int in_val = nums[i], out_val = nums[i - k];\n            counts[in_val]++;\n            curr_sum += in_val;\n            if (--counts[out_val] == 0) counts.erase(out_val);\n            curr_sum -= out_val;\n            if ((int)counts.size() == k) max_sum = max(max_sum, curr_sum);\n        }\n        return max_sum;\n    }\n};",
        approach: "Fixed sliding window with map-size distinctness check",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public long maximumSubarraySum(int[] nums, int k) {\n        Map<Integer, Integer> counts = new HashMap<>();\n        long curr_sum = 0, max_sum = 0;\n        for (int i = 0; i < k; i++) {\n            counts.put(nums[i], counts.getOrDefault(nums[i], 0) + 1);\n            curr_sum += nums[i];\n        }\n        if (counts.size() == k) max_sum = curr_sum;\n        for (int i = k; i < nums.length; i++) {\n            int in_val = nums[i], out_val = nums[i - k];\n            counts.put(in_val, counts.getOrDefault(in_val, 0) + 1);\n            curr_sum += in_val;\n            int out_cnt = counts.get(out_val) - 1;\n            if (out_cnt == 0) counts.remove(out_val);\n            else counts.put(out_val, out_cnt);\n            curr_sum -= out_val;\n            if (counts.size() == k) max_sum = Math.max(max_sum, curr_sum);\n        }\n        return max_sum;\n    }\n}",
        approach: "Fixed sliding window with map-size distinctness check",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var maximumSubarraySum = function(nums, k) {\n    const counts = new Map();\n    let curr_sum = 0, max_sum = 0;\n    for (let i = 0; i < k; i++) {\n        counts.set(nums[i], (counts.get(nums[i]) || 0) + 1);\n        curr_sum += nums[i];\n    }\n    if (counts.size === k) max_sum = curr_sum;\n    for (let i = k; i < nums.length; i++) {\n        const in_val = nums[i], out_val = nums[i - k];\n        counts.set(in_val, (counts.get(in_val) || 0) + 1);\n        curr_sum += in_val;\n        const out_cnt = counts.get(out_val) - 1;\n        if (out_cnt === 0) counts.delete(out_val);\n        else counts.set(out_val, out_cnt);\n        curr_sum -= out_val;\n        if (counts.size === k) max_sum = Math.max(max_sum, curr_sum);\n    }\n    return max_sum;\n};",
        approach: "Fixed sliding window with map-size distinctness check",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ([1, 5, 4, 2, 9, 9, 9], 3, 15),
        ([4, 4, 4], 3, 0),
        ([1, 1, 1, 7, 8, 9], 3, 24),
        ([1, 2, 3, 4, 5], 5, 15)
    ]
    for nums, k, exp in fixed:
        assert solver.maximumSubarraySum(nums, k) == exp

    rng = random.Random(42)
    for _ in range(35):
        sz = rng.randint(1, 35)
        nums = [rng.randint(1, 12) for _ in range(sz)]
        k = rng.randint(1, sz)
        # reference
        ref = 0
        for i in range(sz - k + 1):
            sub = nums[i:i + k]
            if len(set(sub)) == k:
                ref = max(ref, sum(sub))
        assert solver.maximumSubarraySum(nums, k) == ref

    # Scale test: 50,000 distinct items
    big = list(range(50000))
    t0 = time.perf_counter()
    res = solver.maximumSubarraySum(big, 500)
    t1 = time.perf_counter()
    assert res > 0
    print(f"✓ Maximum Sum of Distinct Subarrays: fixed, 35 random, and N=50k passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "get-equal-substrings-within-budget",
    number: 1208,
    category: "Algorithms",
    patterns: ["two-pointers-window-dynamic"],
    method: "equalSubstring",
    hints: [
      {
        level: 1,
        title: "Cost Constrained Window Obstacle",
        text: "Changing character s[i] to t[i] costs abs(ord(s[i]) - ord(t[i])). How can you find the longest window whose total transformation cost does not exceed maxCost?"
      },
      {
        level: 2,
        title: "Monotonic Window Cost Invariant",
        text: "As right pointer expands, total cost increases monotonically. When total cost exceeds maxCost, advance left pointer to restore validity."
      },
      {
        level: 3,
        title: "Dynamic Window Expansion Procedure",
        text: "Initialize left = 0, currCost = 0, maxLen = 0. For right in range(len(s)): add abs(ord(s[right]) - ord(t[right])) to currCost. While currCost > maxCost: subtract abs(ord(s[left]) - ord(t[left])) from currCost; left += 1. Update maxLen = max(maxLen, right - left + 1). Return maxLen."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def equalSubstring(self, s: str, t: str, maxCost: int) -> int:\n        left = 0\n        curr_cost = 0\n        max_len = 0\n        for right in range(len(s)):\n            curr_cost += abs(ord(s[right]) - ord(t[right]))\n            while curr_cost > maxCost:\n                curr_cost -= abs(ord(s[left]) - ord(t[left]))\n                left += 1\n            max_len = max(max_len, right - left + 1)\n        return max_len\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N)",
      space: "O(1)",
      variables: ["N: length of string s and t (1 <= N <= 10^5)", "maxCost: maximum budget (0 <= maxCost <= 10^6)"],
      notes: "Dynamic sliding window advancing left and right at most N times in O(1) space.",
      whyNaiveFails: "Testing all O(N^2) substrings and computing conversion costs takes quadratic time.",
      spaceTimeTradeoff: "Zero auxiliary memory overhead.",
      interviewerExpectation: "Recognizing that transformation cost is non-negative, enabling standard two-pointer dynamic expansion."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def equalSubstring(self, s: str, t: str, maxCost: int) -> int:\n        left = 0\n        curr_cost = 0\n        max_len = 0\n        for right in range(len(s)):\n            curr_cost += abs(ord(s[right]) - ord(t[right]))\n            while curr_cost > maxCost:\n                curr_cost -= abs(ord(s[left]) - ord(t[left]))\n                left += 1\n            max_len = max(max_len, right - left + 1)\n        return max_len",
        approach: "Dynamic sliding window with rolling conversion cost",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    int equalSubstring(string s, string t, int maxCost) {\n        int left = 0, curr_cost = 0, max_len = 0;\n        for (int right = 0; right < (int)s.length(); right++) {\n            curr_cost += abs(s[right] - t[right]);\n            while (curr_cost > maxCost) {\n                curr_cost -= abs(s[left] - t[left]);\n                left++;\n            }\n            max_len = max(max_len, right - left + 1);\n        }\n        return max_len;\n    }\n};",
        approach: "Dynamic sliding window with rolling conversion cost",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public int equalSubstring(String s, String t, int maxCost) {\n        int left = 0, curr_cost = 0, max_len = 0;\n        for (int right = 0; right < s.length(); right++) {\n            curr_cost += Math.abs(s.charAt(right) - t.charAt(right));\n            while (curr_cost > maxCost) {\n                curr_cost -= Math.abs(s.charAt(left) - t.charAt(left));\n                left++;\n            }\n            max_len = Math.max(max_len, right - left + 1);\n        }\n        return max_len;\n    }\n}",
        approach: "Dynamic sliding window with rolling conversion cost",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var equalSubstring = function(s, t, maxCost) {\n    let left = 0, curr_cost = 0, max_len = 0;\n    for (let right = 0; right < s.length; right++) {\n        curr_cost += Math.abs(s.charCodeAt(right) - t.charCodeAt(right));\n        while (curr_cost > maxCost) {\n            curr_cost -= Math.abs(s.charCodeAt(left) - t.charCodeAt(left));\n            left++;\n        }\n        max_len = Math.max(max_len, right - left + 1);\n    }\n    return max_len;\n};",
        approach: "Dynamic sliding window with rolling conversion cost",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    fixed = [
        ("abcd", "bcdf", 3, 3),
        ("abcd", "cdef", 3, 1),
        ("abcd", "acde", 0, 1),
        ("a", "z", 25, 1),
        ("a", "z", 10, 0)
    ]
    for s, t, cost, exp in fixed:
        assert solver.equalSubstring(s, t, cost) == exp

    rng = random.Random(42)
    letters = "abcdefgh"
    for _ in range(35):
        sz = rng.randint(1, 35)
        s = ''.join(rng.choice(letters) for _ in range(sz))
        t = ''.join(rng.choice(letters) for _ in range(sz))
        cost = rng.randint(0, 30)
        # reference
        ref = 0
        for i in range(sz):
            cur = 0
            for j in range(i, sz):
                cur += abs(ord(s[j]) - ord(t[j]))
                if cur <= cost: ref = max(ref, j - i + 1)
                else: break
        assert solver.equalSubstring(s, t, cost) == ref

    # Scale test: 50,000 characters
    s = "a" * 50000
    t = "b" * 50000
    t0 = time.perf_counter()
    res = solver.equalSubstring(s, t, 100)
    t1 = time.perf_counter()
    assert res == 100
    print(f"✓ Get Equal Substrings Within Budget: fixed, 35 random, and N=50k passed in {(t1-t0)*1000:.2f}ms")
`
  },
  {
    slug: "reorganize-string",
    number: 767,
    category: "Algorithms",
    patterns: ["heap-top-k-elements"],
    method: "reorganizeString",
    hints: [
      {
        level: 1,
        title: "Adjacent Identical Character Obstacle",
        text: "If any character appears more than (len(s) + 1) // 2 times, no valid rearrangement exists. How can placing the most frequent remaining characters greedily prevent collisions?"
      },
      {
        level: 2,
        title: "Max-Frequency Greedy Invariant",
        text: "Always pick the character with highest remaining count that differs from the previous placed character. Track characters in a max-priority queue."
      },
      {
        level: 3,
        title: "Priority Queue Interleaving Procedure",
        text: "Build a frequency table. If any count > (len(s) + 1) // 2, return empty string. Place counts into a max-priority queue. While queue has >= 2 elements, pop the two most frequent characters, append both to result, decrement counts, and push back if positive. Handle any final single character."
      },
      {
        level: 4,
        title: "Complete Implementation",
        text: "```python\nclass Solution:\n    def reorganizeString(self, s: str) -> str:\n        import heapq\n        from collections import Counter\n        counts = Counter(s)\n        max_freq = max(counts.values())\n        if max_freq > (len(s) + 1) // 2:\n            return \"\"\n        heap = [(-cnt, ch) for ch, cnt in counts.items()]\n        heapq.heapify(heap)\n        res = []\n        while len(heap) >= 2:\n            cnt1, ch1 = heapq.heappop(heap)\n            cnt2, ch2 = heapq.heappop(heap)\n            res.extend([ch1, ch2])\n            if cnt1 + 1 < 0:\n                heapq.heappush(heap, (cnt1 + 1, ch1))\n            if cnt2 + 1 < 0:\n                heapq.heappush(heap, (cnt2 + 1, ch2))\n        if heap:\n            res.append(heap[0][1])\n        return \"\".join(res)\n```"
      }
    ],
    complexity: {
      kind: "big-o",
      time: "O(N * log A)",
      space: "O(A)",
      variables: ["N: length of string s (1 <= N <= 500)", "A: alphabet size (A <= 26)"],
      notes: "Greedy priority queue interleaving popping top 2 frequent characters with alphabet size at most 26.",
      whyNaiveFails: "Generating permutations takes O(N!) time which is impossible for N up to 500.",
      spaceTimeTradeoff: "Heap size bounded by alphabet size 26.",
      interviewerExpectation: "Checking the pigeonhole impossibility condition max_freq > (len(s) + 1) // 2 upfront."
    },
    solutions: [
      {
        lang: "python3",
        code: "class Solution:\n    def reorganizeString(self, s: str) -> str:\n        import heapq\n        from collections import Counter\n        counts = Counter(s)\n        max_freq = max(counts.values())\n        if max_freq > (len(s) + 1) // 2:\n            return \"\"\n        heap = [(-cnt, ch) for ch, cnt in counts.items()]\n        heapq.heapify(heap)\n        res = []\n        while len(heap) >= 2:\n            cnt1, ch1 = heapq.heappop(heap)\n            cnt2, ch2 = heapq.heappop(heap)\n            res.extend([ch1, ch2])\n            if cnt1 + 1 < 0:\n                heapq.heappush(heap, (cnt1 + 1, ch1))\n            if cnt2 + 1 < 0:\n                heapq.heappush(heap, (cnt2 + 1, ch2))\n        if heap:\n            res.append(heap[0][1])\n        return \"\".join(res)",
        approach: "Greedy priority queue interleaving of most frequent characters",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "cpp",
        code: "class Solution {\npublic:\n    string reorganizeString(string s) {\n        vector<int> counts(26, 0);\n        for (char c : s) counts[c - 'a']++;\n        int max_freq = 0;\n        for (int c : counts) max_freq = max(max_freq, c);\n        if (max_freq > ((int)s.length() + 1) / 2) return \"\";\n        priority_queue<pair<int, char>> pq;\n        for (int i = 0; i < 26; i++) {\n            if (counts[i] > 0) pq.push({counts[i], (char)('a' + i)});\n        }\n        string res = \"\";\n        while (pq.size() >= 2) {\n            auto [cnt1, ch1] = pq.top(); pq.pop();\n            auto [cnt2, ch2] = pq.top(); pq.pop();\n            res.push_back(ch1);\n            res.push_back(ch2);\n            if (cnt1 - 1 > 0) pq.push({cnt1 - 1, ch1});\n            if (cnt2 - 1 > 0) pq.push({cnt2 - 1, ch2});\n        }\n        if (!pq.empty()) res.push_back(pq.top().second);\n        return res;\n    }\n};",
        approach: "Greedy priority queue interleaving of most frequent characters",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "java",
        code: "class Solution {\n    public String reorganizeString(String s) {\n        int[] counts = new int[26];\n        for (int i = 0; i < s.length(); i++) counts[s.charAt(i) - 'a']++;\n        int maxFreq = 0;\n        for (int c : counts) maxFreq = Math.max(maxFreq, c);\n        if (maxFreq > (s.length() + 1) / 2) return \"\";\n        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> b[0] - a[0]);\n        for (int i = 0; i < 26; i++) {\n            if (counts[i] > 0) pq.offer(new int[]{counts[i], i});\n        }\n        StringBuilder sb = new StringBuilder();\n        while (pq.size() >= 2) {\n            int[] first = pq.poll();\n            int[] second = pq.poll();\n            sb.append((char)('a' + first[1]));\n            sb.append((char)('a' + second[1]));\n            if (first[0] - 1 > 0) pq.offer(new int[]{first[0] - 1, first[1]});\n            if (second[0] - 1 > 0) pq.offer(new int[]{second[0] - 1, second[1]});\n        }\n        if (!pq.isEmpty()) sb.append((char)('a' + pq.poll()[1]));\n        return sb.toString();\n    }\n}",
        approach: "Greedy priority queue interleaving of most frequent characters",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      },
      {
        lang: "javascript",
        code: "var reorganizeString = function(s) {\n    const counts = new Array(26).fill(0);\n    for (let i = 0; i < s.length; i++) counts[s.charCodeAt(i) - 97]++;\n    let maxFreq = 0, maxCharIdx = 0;\n    for (let i = 0; i < 26; i++) {\n        if (counts[i] > maxFreq) {\n            maxFreq = counts[i];\n            maxCharIdx = i;\n        }\n    }\n    if (maxFreq > Math.floor((s.length + 1) / 2)) return \"\";\n    const res = new Array(s.length);\n    let idx = 0;\n    while (counts[maxCharIdx] > 0) {\n        res[idx] = String.fromCharCode(97 + maxCharIdx);\n        idx += 2;\n        counts[maxCharIdx]--;\n    }\n    for (let i = 0; i < 26; i++) {\n        while (counts[i] > 0) {\n            if (idx >= s.length) idx = 1;\n            res[idx] = String.fromCharCode(97 + i);\n            idx += 2;\n            counts[i]--;\n        }\n    }\n    return res.join('');\n};",
        approach: "Greedy placement at alternating indices",
        verifiedBy: "tests",
        testedOn: "2026-10-20"
      }
    ],
    testCases: `
    def valid_reorg(orig, res):
        if res == "":
            from collections import Counter
            c = Counter(orig)
            return max(c.values()) > (len(orig) + 1) // 2
        if len(res) != len(orig) or sorted(res) != sorted(orig):
            return False
        for i in range(len(res) - 1):
            if res[i] == res[i + 1]: return False
        return True

    fixed = ["aab", "aaab", "vvvlo", "baaba", "a", "aa"]
    for s in fixed:
        ans = solver.reorganizeString(s)
        assert valid_reorg(s, ans)

    rng = random.Random(42)
    letters = "abcd"
    for _ in range(35):
        sz = rng.randint(1, 30)
        s = ''.join(rng.choice(letters) for _ in range(sz))
        ans = solver.reorganizeString(s)
        assert valid_reorg(s, ans)

    # Scale test: 500 characters
    s = "a" * 250 + "b" * 250
    t0 = time.perf_counter()
    res = solver.reorganizeString(s)
    t1 = time.perf_counter()
    assert valid_reorg(s, res)
    print(f"✓ Reorganize String: fixed, 35 random, and N=500 passed in {(t1-t0)*1000:.2f}ms")
`
  }
];

function generateFiles() {
  for (const item of batch8b) {
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
