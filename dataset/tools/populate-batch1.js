import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');

// Definition of 15 Batch 1 problems
export const BATCH1_PROBLEMS = [
  {
    slug: 'contains-duplicate',
    number: 217,
    category: 'Algorithms',
    patterns: ['hash-map-lookup'],
    twist_type: 'Early Exit Set Membership Scan',
    method: 'containsDuplicate',
    hints: [
      {
        level: 1,
        title: 'Pair Comparison Obstacle',
        text: 'Comparing every pair of numbers takes quadratic time. As you scan the array one number at a time, what property would indicate you have encountered an element previously?'
      },
      {
        level: 2,
        title: 'Lookup Collection for Visited Values',
        text: 'Store each visited value in a lookup collection. If the current number is already in the collection, a duplicate is found immediately.'
      },
      {
        level: 3,
        title: 'Single-Pass Traversal with Set',
        text: 'Iterate through the numbers while tracking visited values in a set. For each number, check if it has already been observed. If so, return true. If the loop completes without finding any duplicate, return false.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def containsDuplicate(self, nums: list[int]) -> bool:\n        seen = set()\n        for num in nums:\n            if num in seen:\n                return True\n            seen.add(num)\n        return False\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: length of nums array (1 <= N <= 10^5)'],
      notes: 'Single pass through nums with O(1) average set lookups and insertions.',
      whyNaiveFails: 'Checking every pair with nested loops requires O(N^2) time. For N = 10^5, this requires up to 5 * 10^9 operations, far exceeding the 1-second timeout on LeetCode.',
      spaceTimeTradeoff: 'Using O(N) auxiliary space in a set or hash table achieves O(N) linear time compared to O(N log N) sorting with O(1) extra space or O(N^2) brute force.',
      interviewerExpectation: 'Immediate identification of the set/hash table approach, early return on first duplicate seen, and awareness of the alternative O(N log N) in-place sorting tradeoff when memory is constrained.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:\n    def containsDuplicate(self, nums: list[int]) -> bool:\n        seen = set()\n        for num in nums:\n            if num in seen:\n                return True\n            seen.add(num)\n        return False`,
        approach: 'One-Pass Hash Set Lookup',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>\n#include <unordered_set>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        unordered_set<int> seen;\n        for (int num : nums) {\n            if (seen.count(num)) {\n                return true;\n            }\n            seen.insert(num);\n        }\n        return false;\n    }\n};`,
        approach: 'One-Pass Unordered Set Lookup',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.Set;\nimport java.util.HashSet;\n\nclass Solution {\n    public boolean containsDuplicate(int[] nums) {\n        Set<Integer> seen = new HashSet<>();\n        for (int num : nums) {\n            if (seen.contains(num)) {\n                return true;\n            }\n            seen.add(num);\n        }\n        return false;\n    }\n}`,
        approach: 'One-Pass HashSet Lookup',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**\n * @param {number[]} nums\n * @return {boolean}\n */\nvar containsDuplicate = function(nums) {\n    const seen = new Set();\n    for (const num of nums) {\n        if (seen.has(num)) {\n            return true;\n        }\n        seen.add(num);\n    }\n    return false;\n};`,
        approach: 'One-Pass Set Lookup',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'valid-anagram',
    number: 242,
    category: 'Algorithms',
    patterns: ['hash-map-lookup'],
    twist_type: 'Frequency Counting with Fixed Alphabet Array',
    method: 'isAnagram',
    hints: [
      {
        level: 1,
        title: 'Rearrangement and Sorting Obstacle',
        text: 'Sorting both strings takes superlinear time and rearranging characters directly is expensive. If two strings are anagrams, what must be identical about their constituent characters?'
      },
      {
        level: 2,
        title: 'Character Frequency Invariant',
        text: 'Two strings are anagrams if and only if they have identical lengths and every distinct character appears the exact same number of times in both.'
      },
      {
        level: 3,
        title: 'Single Frequency Table Balance',
        text: 'First check if the lengths of both strings match. Then count occurrences of each character in the first string and decrement counts for the second string. If every character count resolves to zero, the strings are anagrams.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        if len(s) != len(t):\n            return False\n        counts: dict[str, int] = {}\n        for ch in s:\n            counts[ch] = counts.get(ch, 0) + 1\n        for ch in t:\n            if ch not in counts or counts[ch] == 0:\n                return False\n            counts[ch] -= 1\n        return True\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: length of strings s and t (1 <= N <= 5 * 10^4)', 'K: alphabet size (K = 26)'],
      notes: 'Single pass counting with fixed alphabet size K = 26 gives O(1) auxiliary space.',
      whyNaiveFails: 'Sorting both strings costs O(N log N) time. For large inputs, this adds unnecessary overhead compared to single-pass frequency counting, and generating permutations takes factorial O(N!) time.',
      spaceTimeTradeoff: 'Using O(K) frequency table space where K <= 26 allows O(N) time with minimal constant space overhead, strictly better than O(N log N) sorting.',
      interviewerExpectation: 'Length equality check first, single array or map for frequency counting, awareness of Unicode vs ASCII character sets, and O(1) space justification when alphabet is fixed.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        if len(s) != len(t):\n            return False\n        counts: dict[str, int] = {}\n        for ch in s:\n            counts[ch] = counts.get(ch, 0) + 1\n        for ch in t:\n            if ch not in counts or counts[ch] == 0:\n                return False\n            counts[ch] -= 1\n        return True`,
        approach: 'One-Pass Frequency Counting with Early Exit',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <string>\n#include <vector>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        if (s.length() != t.length()) {\n            return false;\n        }\n        vector<int> counts(26, 0);\n        for (char c : s) {\n            counts[c - 'a']++;\n        }\n        for (char c : t) {\n            if (--counts[c - 'a'] < 0) {\n                return false;\n            }\n        }\n        return true;\n    }\n};`,
        approach: 'Fixed Alphabet Array Frequency Count',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {\n    public boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) {\n            return false;\n        }\n        int[] counts = new int[26];\n        for (int i = 0; i < s.length(); i++) {\n            counts[s.charAt(i) - 'a']++;\n        }\n        for (int i = 0; i < t.length(); i++) {\n            if (--counts[t.charAt(i) - 'a'] < 0) {\n                return false;\n            }\n        }\n        return true;\n    }\n}`,
        approach: 'Fixed Array Frequency Balance',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**\n * @param {string} s\n * @param {string} t\n * @return {boolean}\n */\nvar isAnagram = function(s, t) {\n    if (s.length !== t.length) {\n        return false;\n    }\n    const counts = new Array(26).fill(0);\n    const codeA = 'a'.charCodeAt(0);\n    for (let i = 0; i < s.length; i++) {\n        counts[s.charCodeAt(i) - codeA]++;\n    }\n    for (let i = 0; i < t.length; i++) {\n        const idx = t.charCodeAt(i) - codeA;\n        counts[idx]--;\n        if (counts[idx] < 0) {\n            return false;\n        }\n    }\n    return true;\n};`,
        approach: 'Array Character Frequency Counting',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'group-anagrams',
    number: 49,
    category: 'Algorithms',
    patterns: ['hash-map-lookup'],
    twist_type: 'Canonical Signature Key Bucketing',
    method: 'groupAnagrams',
    hints: [
      {
        level: 1,
        title: 'Pairwise Comparison Obstacle',
        text: 'Comparing each string against all others requires quadratic comparisons. What canonical representation or signature can you compute for any string so that all its anagrams share that exact representation?'
      },
      {
        level: 2,
        title: 'Unique Key Representation',
        text: 'Anagrams have identical character frequencies. Sorting the characters of a word or encoding its 26-element character count creates a unique key that groups matching words together.'
      },
      {
        level: 3,
        title: 'Map by Signature Key',
        text: 'Iterate through each word in the list. Compute its canonical key by sorting its characters or encoding character counts. Map each unique key to a list of original words. Finally, collect and return all the lists of grouped words.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:\n        groups: dict[tuple[int, ...], list[str]] = {}\n        for s in strs:\n            count = [0] * 26\n            for ch in s:\n                count[ord(ch) - ord(\'a\')] += 1\n            key = tuple(count)\n            if key not in groups:\n                groups[key] = []\n            groups[key].append(s)\n        return list(groups.values())\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N * K)',
      space: 'O(N * K)',
      variables: ['N: number of strings (1 <= N <= 10^4)', 'K: maximum length of a string in strs (0 <= K <= 100)'],
      notes: 'Counting 26 characters for each string takes O(K) time per word, totaling O(N * K) time.',
      whyNaiveFails: 'Pairwise anagram checking takes O(N^2 * K) time. For N = 10^4, N^2 = 10^8 comparisons, causing time limit exceeded.',
      spaceTimeTradeoff: 'Storing string groups in memory requires O(N * K) space to store all words in buckets, but reduces time from O(N^2 * K) to linear O(N * K).',
      interviewerExpectation: 'Clear choice of canonical key (count tuple of size 26 or sorted string), handling empty strings and single characters, returning values in any order.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:\n    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:\n        groups: dict[tuple[int, ...], list[str]] = {}\n        for s in strs:\n            count = [0] * 26\n            for ch in s:\n                count[ord(ch) - ord('a')] += 1\n            key = tuple(count)\n            if key not in groups:\n                groups[key] = []\n            groups[key].append(s)\n        return list(groups.values())`,
        approach: 'Character Count Tuple Hashing',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>\n#include <string>\n#include <unordered_map>\n#include <algorithm>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        unordered_map<string, vector<string>> groups;\n        for (const string& s : strs) {\n            string key = s;\n            sort(key.begin(), key.end());\n            groups[key].push_back(s);\n        }\n        vector<vector<string>> result;\n        result.reserve(groups.size());\n        for (auto& pair : groups) {\n            result.push_back(move(pair.second));\n        }\n        return result;\n    }\n};`,
        approach: 'Sorted String Key Map',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.List;\nimport java.util.ArrayList;\nimport java.util.Map;\nimport java.util.HashMap;\nimport java.util.Arrays;\n\nclass Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        Map<String, List<String>> groups = new HashMap<>();\n        for (String s : strs) {\n            char[] chars = s.toCharArray();\n            Arrays.sort(chars);\n            String key = new String(chars);\n            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(s);\n        }\n        return new ArrayList<>(groups.values());\n    }\n}`,
        approach: 'Sorted Character Array Key Grouping',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**\n * @param {string[]} strs\n * @return {string[][]}\n */\nvar groupAnagrams = function(strs) {\n    const groups = new Map();\n    for (let i = 0; i < strs.length; i++) {\n        const s = strs[i];\n        const count = new Array(26).fill(0);\n        const codeA = 97;\n        for (let j = 0; j < s.length; j++) {\n            count[s.charCodeAt(j) - codeA]++;\n        }\n        const key = count.join('#');\n        let list = groups.get(key);\n        if (!list) {\n            list = [];\n            groups.set(key, list);\n        }\n        list.push(s);\n    }\n    return Array.from(groups.values());\n};`,
        approach: 'Count Array Serialization Map',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'top-k-frequent-elements',
    number: 347,
    category: 'Algorithms',
    patterns: ['heap-top-k-elements'],
    twist_type: 'Min-Heap of Size K over Frequencies',
    method: 'topKFrequent',
    hints: [
      {
        level: 1,
        title: 'Full Sort Overhead',
        text: 'Sorting the entire list of frequencies costs O(U log U) where U is the count of distinct elements. When you only need the k largest entries, do you need to sort the whole collection?'
      },
      {
        level: 2,
        title: 'Bounded Selection Structure',
        text: 'Count frequencies first, then maintain only the k most frequent items using a bounded selection structure or bucket frequencies from 1 to N.'
      },
      {
        level: 3,
        title: 'Frequency Count and Min-Heap',
        text: 'Count occurrences of each number. Place elements into buckets indexed by frequency or push them through a min-priority structure capped at size k. Finally, collect the top k elements from the highest frequencies.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport heapq\nfrom collections import Counter\n\n\nclass Solution:\n    def topKFrequent(self, nums: list[int], k: int) -> list[int]:\n        counts = Counter(nums)\n        heap: list[tuple[int, int]] = []\n        for num, freq in counts.items():\n            heapq.heappush(heap, (freq, num))\n            if len(heap) > k:\n                heapq.heappop(heap)\n        return [num for _, num in heap]\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N log K)',
      space: 'O(N + K)',
      variables: ['N: length of nums array (1 <= N <= 10^5)', 'K: target number of frequent elements (1 <= k <= distinct elements)'],
      notes: 'Frequency counting takes O(N). Maintaining a min-heap of size K takes O(U log K) where U <= N.',
      whyNaiveFails: 'Sorting all U unique elements takes O(U log U) time. For N = 10^5 distinct elements, sorting is slower than maintaining a size-k heap (O(N log K)) or bucket sort (O(N)).',
      spaceTimeTradeoff: 'Maintaining a heap of size K keeps extra heap space bounded by O(K), offering predictable cache performance over full array sorting.',
      interviewerExpectation: 'Counting frequencies first, using min-heap of size K (not max-heap of size N), discussing O(N) bucket sort alternative, and verifying K <= number of unique elements.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import heapq\nfrom collections import Counter\n\n\nclass Solution:\n    def topKFrequent(self, nums: list[int], k: int) -> list[int]:\n        counts = Counter(nums)\n        heap: list[tuple[int, int]] = []\n        for num, freq in counts.items():\n            heapq.heappush(heap, (freq, num))\n            if len(heap) > k:\n                heapq.heappop(heap)\n        return [num for _, num in heap]`,
        approach: 'Frequency Counter + Min-Heap of Size K',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>\n#include <unordered_map>\n#include <queue>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> topKFrequent(vector<int>& nums, int k) {\n        unordered_map<int, int> counts;\n        for (int num : nums) {\n            counts[num]++;\n        }\n        using P = pair<int, int>;\n        priority_queue<P, vector<P>, greater<P>> minHeap;\n        for (auto& pair : counts) {\n            minHeap.push({pair.second, pair.first});\n            if ((int)minHeap.size() > k) {\n                minHeap.pop();\n            }\n        }\n        vector<int> result;\n        result.reserve(k);\n        while (!minHeap.empty()) {\n            result.push_back(minHeap.top().second);\n            minHeap.pop();\n        }\n        return result;\n    }\n};`,
        approach: 'Priority Queue Min-Heap of Size K',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.Map;\nimport java.util.HashMap;\nimport java.util.PriorityQueue;\n\nclass Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        Map<Integer, Integer> counts = new HashMap<>();\n        for (int num : nums) {\n            counts.put(num, counts.getOrDefault(num, 0) + 1);\n        }\n        PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));\n        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {\n            minHeap.offer(new int[]{entry.getValue(), entry.getKey()});\n            if (minHeap.size() > k) {\n                minHeap.poll();\n            }\n        }\n        int[] result = new int[k];\n        for (int i = 0; i < k; i++) {\n            result[i] = minHeap.poll()[1];\n        }\n        return result;\n    }\n}`,
        approach: 'HashMap + Min-Heap PriorityQueue',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**\n * @param {number[]} nums\n * @param {number} k\n * @return {number[]}\n */\nvar topKFrequent = function(nums, k) {\n    const counts = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        counts.set(nums[i], (counts.get(nums[i]) || 0) + 1);\n    }\n    const buckets = Array.from({ length: nums.length + 1 }, () => []);\n    for (const [num, freq] of counts.entries()) {\n        buckets[freq].push(num);\n    }\n    const result = [];\n    for (let f = buckets.length - 1; f >= 0 && result.length < k; f--) {\n        for (let i = 0; i < buckets[f].length && result.length < k; i++) {\n            result.push(buckets[f][i]);\n        }\n    }\n    return result;\n};`,
        approach: 'Bucket Sort on Frequency',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'product-of-array-except-self',
    number: 238,
    category: 'Algorithms',
    patterns: ['prefix-sum-hashmap'],
    twist_type: 'Prefix and Suffix Accumulation in Single Array',
    method: 'productExceptSelf',
    hints: [
      {
        level: 1,
        title: 'Zero Handling and Division Obstacle',
        text: 'Computing the product of all elements and dividing by each entry fails when zeros are present, and the problem prohibits division. How can you decompose the product excluding position i into two independent pieces?'
      },
      {
        level: 2,
        title: 'Prefix and Suffix Factorization',
        text: 'The product of all elements except index i is equal to the product of all elements to the left of i multiplied by the product of all elements to the right of i.'
      },
      {
        level: 3,
        title: 'Two-Pass Forward and Backward In-Place Scan',
        text: 'Initialize the output array with prefix products accumulated from left to right. Then iterate backward from the end, maintaining a running suffix product and multiplying it into the corresponding position of the output array.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def productExceptSelf(self, nums: list[int]) -> list[int]:\n        n = len(nums)\n        res = [1] * n\n        prefix = 1\n        for i in range(n):\n            res[i] = prefix\n            prefix *= nums[i]\n        suffix = 1\n        for i in range(n - 1, -1, -1):\n            res[i] *= suffix\n            suffix *= nums[i]\n        return res\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: length of nums array (2 <= N <= 10^5)'],
      notes: 'Two passes over nums using only the output array and O(1) extra scalar accumulators.',
      whyNaiveFails: 'Computing product of all other elements for each index with nested loops takes O(N^2) time. For N = 10^5, this takes 10^10 operations, far exceeding the time limit. Using total division fails on zero elements and is prohibited.',
      spaceTimeTradeoff: 'Building prefix products directly inside the output array and using a single scalar for suffix products reduces auxiliary space from O(N) to O(1) while maintaining O(N) linear time.',
      interviewerExpectation: 'Respecting the no-division constraint, handling multiple zeros correctly, achieving O(1) extra space beyond the result array, and writing clean two-pass logic.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:\n    def productExceptSelf(self, nums: list[int]) -> list[int]:\n        n = len(nums)\n        res = [1] * n\n        prefix = 1\n        for i in range(n):\n            res[i] = prefix\n            prefix *= nums[i]\n        suffix = 1\n        for i in range(n - 1, -1, -1):\n            res[i] *= suffix\n            suffix *= nums[i]\n        return res`,
        approach: 'Two-Pass Prefix and Suffix Product In-Place',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        int n = nums.size();\n        vector<int> res(n, 1);\n        int prefix = 1;\n        for (int i = 0; i < n; ++i) {\n            res[i] = prefix;\n            prefix *= nums[i];\n        }\n        int suffix = 1;\n        for (int i = n - 1; i >= 0; --i) {\n            res[i] *= suffix;\n            suffix *= nums[i];\n        }\n        return res;\n    }\n};`,
        approach: 'O(1) Extra Space Prefix Suffix Pass',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        int n = nums.length;\n        int[] res = new int[n];\n        int prefix = 1;\n        for (int i = 0; i < n; i++) {\n            res[i] = prefix;\n            prefix *= nums[i];\n        }\n        int suffix = 1;\n        for (int i = n - 1; i >= 0; i--) {\n            res[i] *= suffix;\n            suffix *= nums[i];\n        }\n        return res;\n    }\n}`,
        approach: 'Two-Pass Cumulative Product',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**\n * @param {number[]} nums\n * @return {number[]}\n */\nvar productExceptSelf = function(nums) {\n    const n = nums.length;\n    const res = new Array(n).fill(1);\n    let prefix = 1;\n    for (let i = 0; i < n; i++) {\n        res[i] = prefix;\n        prefix *= nums[i];\n    }\n    let suffix = 1;\n    for (let i = n - 1; i >= 0; i--) {\n        res[i] *= suffix;\n        suffix *= nums[i];\n    }\n    return res;\n};`,
        approach: 'In-Place Forward and Backward Accumulation',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'longest-consecutive-sequence',
    number: 128,
    category: 'Algorithms',
    patterns: ['hash-map-lookup'],
    twist_type: 'Sequence Starter Condition (x - 1 not in set)',
    method: 'longestConsecutive',
    hints: [
      {
        level: 1,
        title: 'Sorting Limit and Linear Scan Obstacle',
        text: 'Sorting the numbers allows a linear scan to find consecutive runs, but takes O(N log N) time. How can you determine if a number is the true beginning of a streak without inspecting every other element first?'
      },
      {
        level: 2,
        title: 'Sequence Start Condition',
        text: 'A number x can only start a consecutive sequence if x - 1 does not exist in the collection. Only counting streaks from verified sequence starters ensures each number is visited at most twice.'
      },
      {
        level: 3,
        title: 'Hash Set Lookup and Streak Counting',
        text: 'Insert all numbers into a set for fast lookup. Iterate through the set; if num - 1 is not in the set, num is the start of a streak. Incrementally check for num + 1, num + 2, and so on, updating the maximum length found.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def longestConsecutive(self, nums: list[int]) -> int:\n        num_set = set(nums)\n        longest = 0\n        for num in num_set:\n            if num - 1 not in num_set:\n                curr = num\n                streak = 1\n                while curr + 1 in num_set:\n                    curr += 1\n                    streak += 1\n                if streak > longest:\n                    longest = streak\n        return longest\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: length of nums array (0 <= N <= 10^5)'],
      notes: 'Each element is checked as a sequence starter at most once, and visited at most once during streak expansion, yielding 2N lookups total.',
      whyNaiveFails: 'Sorting the array achieves O(N log N) time, which violates the strict O(N) runtime complexity requirement specified in the problem prompt.',
      spaceTimeTradeoff: 'Using O(N) auxiliary memory to store elements in a hash set achieves strict O(N) linear runtime.',
      interviewerExpectation: 'Identification of the sequence-start condition (num - 1 not in set) to prevent O(N^2) worst-case traversal, handling empty input, duplicate numbers, and negative values.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:\n    def longestConsecutive(self, nums: list[int]) -> int:\n        num_set = set(nums)\n        longest = 0\n        for num in num_set:\n            if num - 1 not in num_set:\n                curr = num\n                streak = 1\n                while curr + 1 in num_set:\n                    curr += 1\n                    streak += 1\n                if streak > longest:\n                    longest = streak\n        return longest`,
        approach: 'Hash Set with Sequence Starter Verification',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>\n#include <unordered_set>\n#include <algorithm>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestConsecutive(vector<int>& nums) {\n        unordered_set<int> numSet(nums.begin(), nums.end());\n        int longest = 0;\n        for (int num : numSet) {\n            if (!numSet.count(num - 1)) {\n                int curr = num;\n                int streak = 1;\n                while (numSet.count(curr + 1)) {\n                    curr++;\n                    streak++;\n                }\n                longest = max(longest, streak);\n            }\n        }\n        return longest;\n    }\n};`,
        approach: 'Unordered Set Starter Check',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.Set;\nimport java.util.HashSet;\n\nclass Solution {\n    public int longestConsecutive(int[] nums) {\n        Set<Integer> numSet = new HashSet<>();\n        for (int num : nums) {\n            numSet.add(num);\n        }\n        int longest = 0;\n        for (int num : numSet) {\n            if (!numSet.contains(num - 1)) {\n                int curr = num;\n                int streak = 1;\n                while (numSet.contains(curr + 1)) {\n                    curr++;\n                    streak++;\n                }\n                longest = Math.max(longest, streak);\n            }\n        }\n        return longest;\n    }\n}`,
        approach: 'HashSet Sequence Starter Check',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**\n * @param {number[]} nums\n * @return {number}\n */\nvar longestConsecutive = function(nums) {\n    const numSet = new Set(nums);\n    let longest = 0;\n    for (const num of numSet) {\n        if (!numSet.has(num - 1)) {\n            let curr = num;\n            let streak = 1;\n            while (numSet.has(curr + 1)) {\n                curr++;\n                streak++;\n            }\n            if (streak > longest) {\n                longest = streak;\n            }\n        }\n    }\n    return longest;\n};`,
        approach: 'Set Boundary Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'valid-palindrome',
    number: 125,
    category: 'Algorithms',
    patterns: ['two-pointers-opposite'],
    twist_type: 'Inward Two Pointers Skipping Non-Alphanumeric',
    method: 'isPalindrome',
    hints: [
      {
        level: 1,
        title: 'String Copying and In-Place Obstacle',
        text: 'Creating a filtered copy of the alphanumeric characters and reversing it allocates extra space. How can you compare corresponding characters from opposite sides in place while skipping punctuation?'
      },
      {
        level: 2,
        title: 'Two Pointers Converging Inward',
        text: 'Start indices at the first and last characters of the string. Advance past non-alphanumeric characters and compare lowercase values inward until the boundaries meet or cross.'
      },
      {
        level: 3,
        title: 'In-Place While Loop Traversal',
        text: 'Place a left index at 0 and a right index at length - 1. While left < right, skip any characters that are not alphanumeric. When both point to valid characters, compare their lowercase forms; if they differ, return false. If they match, advance both inward.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def isPalindrome(self, s: str) -> bool:\n        left, right = 0, len(s) - 1\n        while left < right:\n            while left < right and not s[left].isalnum():\n                left += 1\n            while left < right and not s[right].isalnum():\n                right -= 1\n            if s[left].lower() != s[right].lower():\n                return False\n            left += 1\n            right -= 1\n        return True\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: length of string s (1 <= N <= 2 * 10^5)'],
      notes: 'Single inward pass comparing characters directly without copying or filtering into a new string.',
      whyNaiveFails: 'Filtering the string into a new cleaned string and reversing it requires O(N) auxiliary space, which allocates extra memory and creates unnecessary string copies on large strings.',
      spaceTimeTradeoff: 'Traversing inward in place uses O(1) auxiliary space and terminates early on the first mismatch, whereas string reversal always performs full copies.',
      interviewerExpectation: 'In-place traversal with O(1) extra space, bounds checking while skipping non-alphanumeric characters, case-insensitive comparison, and handling empty/single-character strings.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        left, right = 0, len(s) - 1\n        while left < right:\n            while left < right and not s[left].isalnum():\n                left += 1\n            while left < right and not s[right].isalnum():\n                right -= 1\n            if s[left].lower() != s[right].lower():\n                return False\n            left += 1\n            right -= 1\n        return True`,
        approach: 'Two Pointers Converging Inward In-Place',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <string>\n#include <cctype>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isPalindrome(string s) {\n        int left = 0;\n        int right = (int)s.length() - 1;\n        while (left < right) {\n            while (left < right && !isalnum((unsigned char)s[left])) {\n                left++;\n            }\n            while (left < right && !isalnum((unsigned char)s[right])) {\n                right--;\n            }\n            if (tolower((unsigned char)s[left]) != tolower((unsigned char)s[right])) {\n                return false;\n            }\n            left++;\n            right--;\n        }\n        return true;\n    }\n};`,
        approach: 'In-Place Opposite Two Pointers',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {\n    public boolean isPalindrome(String s) {\n        int left = 0;\n        int right = s.length() - 1;\n        while (left < right) {\n            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {\n                left++;\n            }\n            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {\n                right--;\n            }\n            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {\n                return false;\n            }\n            left++;\n            right--;\n        }\n        return true;\n    }\n}`,
        approach: 'Two Pointers with Character Utilities',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**\n * @param {string} s\n * @return {boolean}\n */\nvar isPalindrome = function(s) {\n    let left = 0;\n    let right = s.length - 1;\n    const isAlnum = (ch) => {\n        const code = ch.charCodeAt(0);\n        return (code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122);\n    };\n    while (left < right) {\n        while (left < right && !isAlnum(s[left])) {\n            left++;\n        }\n        while (left < right && !isAlnum(s[right])) {\n            right--;\n        }\n        if (s[left].toLowerCase() !== s[right].toLowerCase()) {\n            return false;\n        }\n        left++;\n        right--;\n    }\n    return true;\n};`,
        approach: 'Two Pointers Inward Scan',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'two-sum-ii-input-array-is-sorted',
    number: 167,
    category: 'Algorithms',
    patterns: ['two-pointers-opposite'],
    twist_type: 'Monotonic Two Pointers on Sorted Array',
    method: 'twoSum',
    hints: [
      {
        level: 1,
        title: 'Sorted Property and Space Optimization Obstacle',
        text: 'A direct pair scan takes quadratic time and building an auxiliary lookup structure uses linear space. Given that the array is already sorted in non-decreasing order, how can you exploit the monotonic order using constant extra space?'
      },
      {
        level: 2,
        title: 'Monotonic Boundary Adjustment',
        text: 'With numbers sorted, the sum of the smallest and largest available elements indicates how to adjust: if too small, increase the lower bound; if too large, decrease the upper bound.'
      },
      {
        level: 3,
        title: 'Two Pointers Converging Inward',
        text: 'Place a pointer at index 0 and another at the end of the array. At each step, compute numbers[left] + numbers[right]. If the sum matches the target, return [left + 1, right + 1]. If the sum is less than target, increment left. If the sum is greater than target, decrement right.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def twoSum(self, numbers: list[int], target: int) -> list[int]:\n        left, right = 0, len(numbers) - 1\n        while left < right:\n            curr = numbers[left] + numbers[right]\n            if curr == target:\n                return [left + 1, right + 1]\n            if curr < target:\n                left += 1\n            else:\n                right -= 1\n        return []\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: length of numbers array (2 <= N <= 3 * 10^4)'],
      notes: 'Single pass converging inward with O(1) space, returning 1-indexed positions.',
      whyNaiveFails: 'Exhaustive nested pair search takes O(N^2) time. Using a hash map achieves O(N) time but requires O(N) auxiliary memory, failing the constant extra space requirement.',
      spaceTimeTradeoff: 'Leveraging the sorted property allows converging inward with two pointers, achieving O(N) time with O(1) space instead of O(N) hash map memory.',
      interviewerExpectation: 'Immediate convergence proof based on monotonicity, returning 1-indexed output as specified, and achieving O(1) auxiliary space.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:\n    def twoSum(self, numbers: list[int], target: int) -> list[int]:\n        left, right = 0, len(numbers) - 1\n        while left < right:\n            curr = numbers[left] + numbers[right]\n            if curr == target:\n                return [left + 1, right + 1]\n            if curr < target:\n                left += 1\n            else:\n                right -= 1\n        return []`,
        approach: 'Two Pointers Inward Scan (1-Indexed)',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& numbers, int target) {\n        int left = 0;\n        int right = (int)numbers.size() - 1;\n        while (left < right) {\n            int sum = numbers[left] + numbers[right];\n            if (sum == target) {\n                return {left + 1, right + 1};\n            }\n            if (sum < target) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n        return {};\n    }\n};`,
        approach: 'Two Pointers Monotonic Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {\n    public int[] twoSum(int[] numbers, int target) {\n        int left = 0;\n        int right = numbers.length - 1;\n        while (left < right) {\n            int sum = numbers[left] + numbers[right];\n            if (sum == target) {\n                return new int[]{left + 1, right + 1};\n            }\n            if (sum < target) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n        return new int[]{};\n    }\n}`,
        approach: 'Inward Two Pointers (1-Indexed)',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**\n * @param {number[]} numbers\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(numbers, target) {\n    let left = 0;\n    let right = numbers.length - 1;\n    while (left < right) {\n        const sum = numbers[left] + numbers[right];\n        if (sum === target) {\n            return [left + 1, right + 1];\n        }\n        if (sum < target) {\n            left++;\n        } else {\n            right--;\n        }\n    }\n    return [];\n};`,
        approach: 'Two Pointers Inward Scan',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: '3sum',
    number: 15,
    category: 'Algorithms',
    patterns: ['two-pointers-opposite'],
    twist_type: 'Sorted Fix-and-Two-Pointer with Deduplication',
    method: 'threeSum',
    hints: [
      {
        level: 1,
        title: 'Cubic Search and Duplication Obstacle',
        text: 'Testing every combination of three numbers takes cubic time and produces duplicate triplets. How can sorting first simplify both avoiding duplicates and searching for the remaining sum?'
      },
      {
        level: 2,
        title: 'Fix One Element and Inward Two Pointers',
        text: 'Sort the array and fix the first element. The remaining subproblem reduces to finding pairs that sum to the negated fixed value across the remaining sorted suffix.'
      },
      {
        level: 3,
        title: 'Sorted Traversal with Adjacent Duplicate Skipping',
        text: 'Sort the array. Loop through index i from 0 to n - 3, skipping duplicate values for nums[i]. For each i, search the range from i + 1 to n - 1 with inward pointers. When a valid triplet is found, record it and skip duplicate adjacent elements before continuing.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def threeSum(self, nums: list[int]) -> list[list[int]]:\n        nums.sort()\n        res: list[list[int]] = []\n        n = len(nums)\n        for i in range(n - 2):\n            if i > 0 and nums[i] == nums[i - 1]:\n                continue\n            if nums[i] > 0:\n                break\n            left, right = i + 1, n - 1\n            target = -nums[i]\n            while left < right:\n                s = nums[left] + nums[right]\n                if s == target:\n                    res.append([nums[i], nums[left], nums[right]])\n                    while left < right and nums[left] == nums[left + 1]:\n                        left += 1\n                    while left < right and nums[right] == nums[right - 1]:\n                        right -= 1\n                    left += 1\n                    right -= 1\n                elif s < target:\n                    left += 1\n                else:\n                    right -= 1\n        return res\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N^2)',
      space: 'O(log N)',
      variables: ['N: length of nums array (3 <= N <= 3000)'],
      notes: 'Sorting takes O(N log N). Outer loop runs N times with an inner O(N) two-pointer scan, giving O(N^2) total time.',
      whyNaiveFails: 'Checking all triplets with three nested loops takes O(N^3) time. For N = 3000, N^3 = 2.7 * 10^10 operations, which times out immediately. Handling duplicates with set insertions adds massive memory overhead.',
      spaceTimeTradeoff: 'Sorting in O(N log N) time enables duplicate skipping in O(1) space during the O(N^2) two-pointer pass, avoiding large hash set storage for triplet deduplication.',
      interviewerExpectation: 'Deduplicating in place without auxiliary sets, sorting before traversal, early break when nums[i] > 0, and handling pointer adjustments after matching triplets.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:\n    def threeSum(self, nums: list[int]) -> list[list[int]]:\n        nums.sort()\n        res: list[list[int]] = []\n        n = len(nums)\n        for i in range(n - 2):\n            if i > 0 and nums[i] == nums[i - 1]:\n                continue\n            if nums[i] > 0:\n                break\n            left, right = i + 1, n - 1\n            target = -nums[i]\n            while left < right:\n                s = nums[left] + nums[right]\n                if s == target:\n                    res.append([nums[i], nums[left], nums[right]])\n                    while left < right and nums[left] == nums[left + 1]:\n                        left += 1\n                    while left < right and nums[right] == nums[right - 1]:\n                        right -= 1\n                    left += 1\n                    right -= 1\n                elif s < target:\n                    left += 1\n                else:\n                    right -= 1\n        return res`,
        approach: 'Sorted Outer Loop + Inward Two Pointers',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        sort(nums.begin(), nums.end());\n        vector<vector<int>> res;\n        int n = nums.size();\n        for (int i = 0; i < n - 2; ++i) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            if (nums[i] > 0) break;\n            int left = i + 1;\n            int right = n - 1;\n            int target = -nums[i];\n            while (left < right) {\n                int sum = nums[left] + nums[right];\n                if (sum == target) {\n                    res.push_back({nums[i], nums[left], nums[right]});\n                    while (left < right && nums[left] == nums[left + 1]) left++;\n                    while (left < right && nums[right] == nums[right - 1]) right--;\n                    left++;\n                    right--;\n                } else if (sum < target) {\n                    left++;\n                } else {\n                    right--;\n                }\n            }\n        }\n        return res;\n    }\n};`,
        approach: 'Sort + Two Pointers with Duplicate Pruning',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.List;\nimport java.util.ArrayList;\nimport java.util.Arrays;\n\nclass Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        Arrays.sort(nums);\n        List<List<Integer>> res = new ArrayList<>();\n        int n = nums.length;\n        for (int i = 0; i < n - 2; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            if (nums[i] > 0) break;\n            int left = i + 1;\n            int right = n - 1;\n            int target = -nums[i];\n            while (left < right) {\n                int sum = nums[left] + nums[right];\n                if (sum == target) {\n                    res.add(Arrays.asList(nums[i], nums[left], nums[right]));\n                    while (left < right && nums[left] == nums[left + 1]) left++;\n                    while (left < right && nums[right] == nums[right - 1]) right--;\n                    left++;\n                    right--;\n                } else if (sum < target) {\n                    left++;\n                } else {\n                    right--;\n                }\n            }\n        }\n        return res;\n    }\n}`,
        approach: 'Sorted Two-Pointer Pair Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar threeSum = function(nums) {\n    nums.sort((a, b) => a - b);\n    const res = [];\n    const n = nums.length;\n    for (let i = 0; i < n - 2; i++) {\n        if (i > 0 && nums[i] === nums[i - 1]) continue;\n        if (nums[i] > 0) break;\n        let left = i + 1;\n        let right = n - 1;\n        const target = -nums[i];\n        while (left < right) {\n            const sum = nums[left] + nums[right];\n            if (sum === target) {\n                res.push([nums[i], nums[left], nums[right]]);\n                while (left < right && nums[left] === nums[left + 1]) left++;\n                while (left < right && nums[right] === nums[right - 1]) right--;\n                left++;\n                right--;\n            } else if (sum < target) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n    }\n    return res;\n};`,
        approach: 'Sort and Inward Two Pointers',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'container-with-most-water',
    number: 11,
    category: 'Algorithms',
    patterns: ['two-pointers-opposite'],
    twist_type: 'Greedy Inward Squeeze of Shorter Boundary',
    method: 'maxArea',
    hints: [
      {
        level: 1,
        title: 'Quadratic Pair Search Obstacle',
        text: 'Evaluating every pair of lines requires quadratic comparisons. If you start with the widest possible container at both ends, which boundary should move inward to have any hope of finding a larger area?'
      },
      {
        level: 2,
        title: 'Shorter Line Limits Volume',
        text: 'Container area is limited by the shorter line. Moving the taller line inward can only decrease the width without any chance to increase the limiting height, so the shorter line must always move inward.'
      },
      {
        level: 3,
        title: 'Two Pointers Inward Scan',
        text: 'Initialize left at 0 and right at n - 1 with max_area = 0. In each step, calculate the area using (right - left) * min(height[left], height[right]) and update max_area. Then advance whichever pointer has the smaller height inward until the pointers meet.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def maxArea(self, height: list[int]) -> int:\n        left, right = 0, len(height) - 1\n        max_water = 0\n        while left < right:\n            h = min(height[left], height[right])\n            area = (right - left) * h\n            if area > max_water:\n                max_water = area\n            if height[left] < height[right]:\n                left += 1\n            else:\n                right -= 1\n        return max_water\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: length of height array (2 <= N <= 10^5)'],
      notes: 'Single pass where pointers start at opposite ends and advance toward each other.',
      whyNaiveFails: 'Checking all pairs of lines takes O(N^2) time. For N = 10^5, N * (N - 1) / 2 = ~5 * 10^9 operations, exceeding the 1-second limit.',
      spaceTimeTradeoff: 'Greedy inward two-pointer traversal requires O(1) auxiliary space and eliminates suboptimal configurations without evaluating them.',
      interviewerExpectation: 'Formal justification for moving the shorter pointer (proving no larger container can be formed with the discarded line), O(1) extra space, and clean code.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:\n    def maxArea(self, height: list[int]) -> int:\n        left, right = 0, len(height) - 1\n        max_water = 0\n        while left < right:\n            h = min(height[left], height[right])\n            area = (right - left) * h\n            if area > max_water:\n                max_water = area\n            if height[left] < height[right]:\n                left += 1\n            else:\n                right -= 1\n        return max_water`,
        approach: 'Two Pointers Converging Inward Greedy',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        int left = 0;\n        int right = (int)height.size() - 1;\n        int maxWater = 0;\n        while (left < right) {\n            int h = min(height[left], height[right]);\n            maxWater = max(maxWater, (right - left) * h);\n            if (height[left] < height[right]) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n        return maxWater;\n    }\n};`,
        approach: 'Inward Two Pointers Moving Shorter Bar',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {\n    public int maxArea(int[] height) {\n        int left = 0;\n        int right = height.length - 1;\n        int maxWater = 0;\n        while (left < right) {\n            int h = Math.min(height[left], height[right]);\n            maxWater = Math.max(maxWater, (right - left) * h);\n            if (height[left] < height[right]) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n        return maxWater;\n    }\n}`,
        approach: 'Two Pointers Area Optimization',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**\n * @param {number[]} height\n * @return {number}\n */\nvar maxArea = function(height) {\n    let left = 0;\n    let right = height.length - 1;\n    let maxWater = 0;\n    while (left < right) {\n        const h = Math.min(height[left], height[right]);\n        const area = (right - left) * h;\n        if (area > maxWater) {\n            maxWater = area;\n        }\n        if (height[left] < height[right]) {\n            left++;\n        } else {\n            right--;\n        }\n    }\n    return maxWater;\n};`,
        approach: 'Greedy Two-Pointer Scan',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'trapping-rain-water',
    number: 42,
    category: 'Algorithms',
    patterns: ['two-pointers-opposite'],
    twist_type: 'Opposite Two Pointers with Running Max Invariant',
    method: 'trap',
    hints: [
      {
        level: 1,
        title: 'Boundary Height and Trapping Obstacle',
        text: 'Water trapped above bar i equals min(max_left, max_right) - height[i]. Computing these boundary heights for every bar takes quadratic time. How can you find each bar\'s limiting boundary in a single pass without extra arrays?'
      },
      {
        level: 2,
        title: 'Smaller Maximum Determines Water',
        text: 'If the running maximum on the left is smaller than the running maximum on the right, the left bar\'s water level is bounded strictly by its left maximum regardless of any taller bars further to the right.'
      },
      {
        level: 3,
        title: 'Two Pointers with Running Left and Right Maximums',
        text: 'Track left and right boundaries alongside left_max and right_max. While left < right, if left_max < right_max, process bar left: add max(0, left_max - height[left]) to the total, update left_max, and increment left. Otherwise process bar right similarly.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def trap(self, height: list[int]) -> int:\n        if not height:\n            return 0\n        left, right = 0, len(height) - 1\n        left_max, right_max = height[left], height[right]\n        water = 0\n        while left < right:\n            if left_max < right_max:\n                left += 1\n                left_max = max(left_max, height[left])\n                water += left_max - height[left]\n            else:\n                right -= 1\n                right_max = max(right_max, height[right])\n                water += right_max - height[right]\n        return water\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: length of height array (1 <= N <= 2 * 10^4)'],
      notes: 'Single pass inward with two pointers and two scalar max trackers.',
      whyNaiveFails: 'Finding left and right maximums independently for each bar with a scan takes O(N^2) time. For N = 2 * 10^4, this requires ~2 * 10^8 operations, which is too slow.',
      spaceTimeTradeoff: 'The two-pointer technique achieves O(1) auxiliary space compared to precomputing prefix/suffix arrays which require O(N) space.',
      interviewerExpectation: 'Clear derivation of water formula min(L_max, R_max) - h[i], reduction from O(N) space prefix arrays to O(1) two pointers, handling empty or monotone inputs.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:\n    def trap(self, height: list[int]) -> int:\n        if not height:\n            return 0\n        left, right = 0, len(height) - 1\n        left_max, right_max = height[left], height[right]\n        water = 0\n        while left < right:\n            if left_max < right_max:\n                left += 1\n                left_max = max(left_max, height[left])\n                water += left_max - height[left]\n            else:\n                right -= 1\n                right_max = max(right_max, height[right])\n                water += right_max - height[right]\n        return water`,
        approach: 'Two Pointers with Running Left/Right Max',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    int trap(vector<int>& height) {\n        if (height.empty()) return 0;\n        int left = 0;\n        int right = (int)height.size() - 1;\n        int leftMax = height[left];\n        int rightMax = height[right];\n        int water = 0;\n        while (left < right) {\n            if (leftMax < rightMax) {\n                left++;\n                leftMax = max(leftMax, height[left]);\n                water += leftMax - height[left];\n            } else {\n                right--;\n                rightMax = max(rightMax, height[right]);\n                water += rightMax - height[right];\n            }\n        }\n        return water;\n    }\n};`,
        approach: 'O(1) Auxiliary Space Two Pointers',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {\n    public int trap(int[] height) {\n        if (height == null || height.length == 0) return 0;\n        int left = 0;\n        int right = height.length - 1;\n        int leftMax = height[left];\n        int rightMax = height[right];\n        int water = 0;\n        while (left < right) {\n            if (leftMax < rightMax) {\n                left++;\n                leftMax = Math.max(leftMax, height[left]);\n                water += leftMax - height[left];\n            } else {\n                right--;\n                rightMax = Math.max(rightMax, height[right]);\n                water += rightMax - height[right];\n            }\n        }\n        return water;\n    }\n}`,
        approach: 'Inward Two Pointers Max Trapping',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**\n * @param {number[]} height\n * @return {number}\n */\nvar trap = function(height) {\n    if (!height || height.length === 0) return 0;\n    let left = 0;\n    let right = height.length - 1;\n    let leftMax = height[left];\n    let rightMax = height[right];\n    let water = 0;\n    while (left < right) {\n        if (leftMax < rightMax) {\n            left++;\n            leftMax = Math.max(leftMax, height[left]);\n            water += leftMax - height[left];\n        } else {\n            right--;\n            rightMax = Math.max(rightMax, height[right]);\n            water += rightMax - height[right];\n        }\n    }\n    return water;\n};`,
        approach: 'Two Pointers Running Max Tracker',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'best-time-to-buy-and-sell-stock',
    number: 121,
    category: 'Algorithms',
    patterns: ['array-kadane'],
    twist_type: 'Prefix Minimum Price Tracker',
    method: 'maxProfit',
    hints: [
      {
        level: 1,
        title: 'Pair Search and Temporal Direction Obstacle',
        text: 'Checking all possible buy and sell day pairs takes quadratic time. As you move forward in time, what single quantity from past days is sufficient to evaluate the profit of selling today?'
      },
      {
        level: 2,
        title: 'Running Minimum Purchase Price',
        text: 'To maximize profit on day i, you should buy at the lowest price seen prior to day i. Maintaining a running minimum price allows instant evaluation of potential profit at each step.'
      },
      {
        level: 3,
        title: 'Single-Pass Min and Profit Update',
        text: 'Track min_price initialized to infinity and max_profit initialized to 0. For each price, update min_price with the minimum of itself and the current price, then update max_profit with the maximum of itself and (current price - min_price).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        min_price = float(\'inf\')\n        max_profit = 0\n        for price in prices:\n            if price < min_price:\n                min_price = price\n            elif price - min_price > max_profit:\n                max_profit = price - min_price\n        return max_profit\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: length of prices array (1 <= N <= 10^5)'],
      notes: 'Single forward pass with constant extra memory tracking minimum price and maximum profit.',
      whyNaiveFails: 'Testing all pairs (i, j) where i < j takes O(N^2) time. For N = 10^5, N^2 / 2 = 5 * 10^9 operations, exceeding the time limit.',
      spaceTimeTradeoff: 'Single-pass running minimum uses O(1) space and achieves O(N) linear time, avoiding any extra data structures.',
      interviewerExpectation: 'Immediate identification of the one-pass invariant, handling monotonically decreasing prices (returning 0 profit), and O(1) auxiliary space.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        min_price = float('inf')\n        max_profit = 0\n        for price in prices:\n            if price < min_price:\n                min_price = price\n            elif price - min_price > max_profit:\n                max_profit = price - min_price\n        return max_profit`,
        approach: 'One-Pass Running Minimum Price Tracker',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        int minPrice = 1e9;\n        int maxProfit = 0;\n        for (int p : prices) {\n            if (p < minPrice) {\n                minPrice = p;\n            } else if (p - minPrice > maxProfit) {\n                maxProfit = p - minPrice;\n            }\n        }\n        return maxProfit;\n    }\n};`,
        approach: 'Single Pass Minimum Tracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {\n    public int maxProfit(int[] prices) {\n        int minPrice = Integer.MAX_VALUE;\n        int maxProfit = 0;\n        for (int p : prices) {\n            if (p < minPrice) {\n                minPrice = p;\n            } else if (p - minPrice > maxProfit) {\n                maxProfit = p - minPrice;\n            }\n        }\n        return maxProfit;\n    }\n}`,
        approach: 'One-Pass Running Minimum',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**\n * @param {number[]} prices\n * @return {number}\n */\nvar maxProfit = function(prices) {\n    let minPrice = Infinity;\n    let maxProfit = 0;\n    for (let i = 0; i < prices.length; i++) {\n        const p = prices[i];\n        if (p < minPrice) {\n            minPrice = p;\n        } else if (p - minPrice > maxProfit) {\n            maxProfit = p - minPrice;\n        }\n    }\n    return maxProfit;\n};`,
        approach: 'Running Minimum and Max Profit',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'longest-substring-without-repeating-characters',
    number: 3,
    category: 'Algorithms',
    patterns: ['two-pointers-window-dynamic'],
    twist_type: 'Sliding Window with Last-Seen Index Boundary Jump',
    method: 'lengthOfLongestSubstring',
    hints: [
      {
        level: 1,
        title: 'Cubic Substring Check Obstacle',
        text: 'Testing every possible substring for duplicate characters takes cubic time. How can you extend a contiguous valid segment to the right and only contract the left boundary when a duplicate appears?'
      },
      {
        level: 2,
        title: 'Dynamic Window Boundary Jump',
        text: 'Maintain an expandable contiguous range [left, right]. When character s[right] was already seen at index j >= left, jumping left directly to j + 1 restores uniqueness in constant time.'
      },
      {
        level: 3,
        title: 'Sliding Window with Last-Seen Map',
        text: 'Iterate through s with index right, recording the most recent index of each character. If the current character was previously seen at or after left, advance left to that character\'s last seen index + 1. Update the maximum length with right - left + 1.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        last_seen: dict[str, int] = {}\n        left = 0\n        max_len = 0\n        for right, ch in enumerate(s):\n            if ch in last_seen and last_seen[ch] >= left:\n                left = last_seen[ch] + 1\n            last_seen[ch] = right\n            curr_len = right - left + 1\n            if curr_len > max_len:\n                max_len = curr_len\n        return max_len\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(min(N, M))',
      variables: ['N: length of string s (0 <= N <= 5 * 10^4)', 'M: size of character set (M <= 128 for ASCII or 256 for extended)'],
      notes: 'Each character is processed once. Auxiliary hash map size is bounded by the alphabet size M.',
      whyNaiveFails: 'Checking all O(N^2) substrings with an O(N) duplicate check takes O(N^3) time. For N = 5 * 10^4, this takes over 10^13 operations, timing out immediately.',
      spaceTimeTradeoff: 'Storing the last seen position of each character in an O(M) table allows jumping the left boundary forward in O(1) time instead of shrinking character by character.',
      interviewerExpectation: 'Handling boundary jump condition (last_seen[ch] >= left), edge cases like empty string, all identical characters, and all distinct characters, achieving O(N) time.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        last_seen: dict[str, int] = {}\n        left = 0\n        max_len = 0\n        for right, ch in enumerate(s):\n            if ch in last_seen and last_seen[ch] >= left:\n                left = last_seen[ch] + 1\n            last_seen[ch] = right\n            curr_len = right - left + 1\n            if curr_len > max_len:\n                max_len = curr_len\n        return max_len`,
        approach: 'Sliding Window with Last-Seen Index Map',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        vector<int> lastSeen(256, -1);\n        int left = 0;\n        int maxLen = 0;\n        for (int right = 0; right < (int)s.length(); ++right) {\n            unsigned char ch = (unsigned char)s[right];\n            if (lastSeen[ch] >= left) {\n                left = lastSeen[ch] + 1;\n            }\n            lastSeen[ch] = right;\n            maxLen = max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n};`,
        approach: 'Direct ASCII Array Last-Seen Jump',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.Map;\nimport java.util.HashMap;\n\nclass Solution {\n    public int lengthOfLongestSubstring(String s) {\n        Map<Character, Integer> lastSeen = new HashMap<>();\n        int left = 0;\n        int maxLen = 0;\n        for (int right = 0; right < s.length(); right++) {\n            char ch = s.charAt(right);\n            if (lastSeen.containsKey(ch) && lastSeen.get(ch) >= left) {\n                left = lastSeen.get(ch) + 1;\n            }\n            lastSeen.put(ch, right);\n            maxLen = Math.max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n}`,
        approach: 'Dynamic Window with HashMap',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**\n * @param {string} s\n * @return {number}\n */\nvar lengthOfLongestSubstring = function(s) {\n    const lastSeen = new Map();\n    let left = 0;\n    let maxLen = 0;\n    for (let right = 0; right < s.length; right++) {\n        const ch = s[right];\n        if (lastSeen.has(ch) && lastSeen.get(ch) >= left) {\n            left = lastSeen.get(ch) + 1;\n        }\n        lastSeen.set(ch, right);\n        const currLen = right - left + 1;\n        if (currLen > maxLen) {\n            maxLen = currLen;\n        }\n    }\n    return maxLen;\n};`,
        approach: 'Map Index Jump Sliding Window',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'longest-repeating-character-replacement',
    number: 424,
    category: 'Algorithms',
    patterns: ['two-pointers-window-dynamic'],
    twist_type: 'Sliding Window with Max-Frequency Invariant',
    method: 'characterReplacement',
    hints: [
      {
        level: 1,
        title: 'Range Replacement Cost Obstacle',
        text: 'Testing every substring takes quadratic time. For a contiguous range of length L, how many character replacements are required to make all of its characters identical?'
      },
      {
        level: 2,
        title: 'Majority Frequency Invariant',
        text: 'In any range, the fewest replacements needed equals the length minus the count of the most frequent character. The range is valid whenever length - max_frequency <= k.'
      },
      {
        level: 3,
        title: 'Dynamic Window Shrink Condition',
        text: 'Expand a right boundary while counting character frequencies and updating max_freq. If window size - max_freq exceeds k, decrement the count of s[left] and increment left by 1. The maximum valid window size found is the answer.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def characterReplacement(self, s: str, k: int) -> int:\n        counts: dict[str, int] = {}\n        max_freq = 0\n        left = 0\n        max_len = 0\n        for right, ch in enumerate(s):\n            counts[ch] = counts.get(ch, 0) + 1\n            if counts[ch] > max_freq:\n                max_freq = counts[ch]\n            while (right - left + 1) - max_freq > k:\n                counts[s[left]] -= 1\n                left += 1\n            curr_len = right - left + 1\n            if curr_len > max_len:\n                max_len = curr_len\n        return max_len\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: length of string s (1 <= N <= 10^5)', 'K: allowed replacements (0 <= k <= N)'],
      notes: 'Single pass where left and right pointers each move at most N times; frequency map is bounded by 26 uppercase letters.',
      whyNaiveFails: 'Checking all O(N^2) substrings and verifying whether the non-majority characters can be replaced within k edits takes O(26 * N^2) time, which causes time limit exceeded for N = 10^5.',
      spaceTimeTradeoff: 'Maintaining a running frequency map of size 26 allows dynamic window expansion and contraction in O(1) space and O(N) time.',
      interviewerExpectation: 'Clear formulation of the valid window condition (length - max_freq <= k), knowing why max_freq does not need to be decremented when shrinking (or properly maintaining it), and achieving O(1) space.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:\n    def characterReplacement(self, s: str, k: int) -> int:\n        counts: dict[str, int] = {}\n        max_freq = 0\n        left = 0\n        max_len = 0\n        for right, ch in enumerate(s):\n            counts[ch] = counts.get(ch, 0) + 1\n            if counts[ch] > max_freq:\n                max_freq = counts[ch]\n            while (right - left + 1) - max_freq > k:\n                counts[s[left]] -= 1\n                left += 1\n            curr_len = right - left + 1\n            if curr_len > max_len:\n                max_len = curr_len\n        return max_len`,
        approach: 'Dynamic Sliding Window with Max Frequency',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    int characterReplacement(string s, int k) {\n        vector<int> counts(26, 0);\n        int maxFreq = 0;\n        int left = 0;\n        int maxLen = 0;\n        for (int right = 0; right < (int)s.length(); ++right) {\n            counts[s[right] - 'A']++;\n            maxFreq = max(maxFreq, counts[s[right] - 'A']);\n            while ((right - left + 1) - maxFreq > k) {\n                counts[s[left] - 'A']--;\n                left++;\n            }\n            maxLen = max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n};`,
        approach: 'Array Frequency Dynamic Window',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {\n    public int characterReplacement(String s, int k) {\n        int[] counts = new int[26];\n        int maxFreq = 0;\n        int left = 0;\n        int maxLen = 0;\n        for (int right = 0; right < s.length(); right++) {\n            counts[s.charAt(right) - 'A']++;\n            maxFreq = Math.max(maxFreq, counts[s.charAt(right) - 'A']);\n            while ((right - left + 1) - maxFreq > k) {\n                counts[s.charAt(left) - 'A']--;\n                left++;\n            }\n            maxLen = Math.max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n}`,
        approach: 'Sliding Window Frequency Invariant',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**\n * @param {string} s\n * @param {number} k\n * @return {number}\n */\nvar characterReplacement = function(s, k) {\n    const counts = new Array(26).fill(0);\n    const codeA = 65;\n    let maxFreq = 0;\n    let left = 0;\n    let maxLen = 0;\n    for (let right = 0; right < s.length; right++) {\n        const idx = s.charCodeAt(right) - codeA;\n        counts[idx]++;\n        if (counts[idx] > maxFreq) {\n            maxFreq = counts[idx];\n        }\n        while ((right - left + 1) - maxFreq > k) {\n            counts[s.charCodeAt(left) - codeA]--;\n            left++;\n        }\n        const currLen = right - left + 1;\n        if (currLen > maxLen) {\n            maxLen = currLen;\n        }\n    }\n    return maxLen;\n};`,
        approach: 'Dynamic Window Replacement Count',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'minimum-window-substring',
    number: 76,
    category: 'Algorithms',
    patterns: ['two-pointers-window-dynamic'],
    twist_type: 'Two Pointers Expand and Shrink Matching Target Frequencies',
    method: 'minWindow',
    hints: [
      {
        level: 1,
        title: 'Exhaustive Window Search Obstacle',
        text: 'Testing every substring of s to check if it contains all characters of t takes O(|s|^2 * |t|) time. How can you expand a range until all required characters are present, then contract it from the left to find the minimal valid span?'
      },
      {
        level: 2,
        title: 'Frequency Deficit and Contraction Invariant',
        text: 'Track required character counts from t. Expand the right boundary to satisfy all character needs, then shrink the left boundary while all counts remain satisfied to minimize the window.'
      },
      {
        level: 3,
        title: 'Formed Counter and Dynamic Two Pointers',
        text: 'Count character frequencies in t and track how many distinct characters have met their target. Advance right, incrementing window counts. When all distinct required characters are satisfied, advance left to shrink the window while recording the minimum valid length, until a requirement is violated.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nfrom collections import Counter\n\n\nclass Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        if not s or not t:\n            return ""\n        need = Counter(t)\n        required = len(need)\n        window: dict[str, int] = {}\n        formed = 0\n        left = 0\n        min_len = float(\'inf\')\n        min_start = 0\n\n        for right, ch in enumerate(s):\n            window[ch] = window.get(ch, 0) + 1\n            if ch in need and window[ch] == need[ch]:\n                formed += 1\n\n            while left <= right and formed == required:\n                curr_len = right - left + 1\n                if curr_len < min_len:\n                    min_len = curr_len\n                    min_start = left\n\n                left_ch = s[left]\n                window[left_ch] -= 1\n                if left_ch in need and window[left_ch] < need[left_ch]:\n                    formed -= 1\n                left += 1\n\n        return "" if min_len == float(\'inf\') else s[min_start:min_start + int(min_len)]\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(|S| + |T|)',
      space: 'O(|S| + |T|)',
      variables: ['|S|: length of string s (1 <= |S| <= 10^5)', '|T|: length of string t (1 <= |T| <= 10^5)'],
      notes: 'Each character in s is visited at most twice (once by right pointer, once by left pointer).',
      whyNaiveFails: 'Checking all O(|S|^2) substrings by checking character counts against t takes O(|S|^2 * |T|) time, leading to time limit exceeded.',
      spaceTimeTradeoff: 'Storing character frequencies in two hash tables uses O(|S| + |T|) space to enable linear O(|S| + |T|) window expansion and contraction.',
      interviewerExpectation: 'Using a "formed" variable to track satisfied distinct character counts (avoiding comparing the entire map on every step), correct left-shrinking loop, and returning empty string when no valid window exists.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from collections import Counter\n\n\nclass Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        if not s or not t:\n            return ""\n        need = Counter(t)\n        required = len(need)\n        window: dict[str, int] = {}\n        formed = 0\n        left = 0\n        min_len = float('inf')\n        min_start = 0\n\n        for right, ch in enumerate(s):\n            window[ch] = window.get(ch, 0) + 1\n            if ch in need and window[ch] == need[ch]:\n                formed += 1\n\n            while left <= right and formed == required:\n                curr_len = right - left + 1\n                if curr_len < min_len:\n                    min_len = curr_len\n                    min_start = left\n\n                left_ch = s[left]\n                window[left_ch] -= 1\n                if left_ch in need and window[left_ch] < need[left_ch]:\n                    formed -= 1\n                left += 1\n\n        return "" if min_len == float('inf') else s[min_start:min_start + int(min_len)]`,
        approach: 'Dynamic Sliding Window with Formed Counter',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <string>\n#include <vector>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    string minWindow(string s, string t) {\n        if (s.empty() || t.empty()) return "";\n        vector<int> need(128, 0);\n        int required = 0;\n        for (char c : t) {\n            if (need[(unsigned char)c] == 0) required++;\n            need[(unsigned char)c]++;\n        }\n        vector<int> window(128, 0);\n        int formed = 0;\n        int left = 0;\n        int minLen = 1e9;\n        int minStart = 0;\n        for (int right = 0; right < (int)s.length(); ++right) {\n            unsigned char c = (unsigned char)s[right];\n            window[c]++;\n            if (need[c] > 0 && window[c] == need[c]) {\n                formed++;\n            }\n            while (left <= right && formed == required) {\n                int currLen = right - left + 1;\n                if (currLen < minLen) {\n                    minLen = currLen;\n                    minStart = left;\n                }\n                unsigned char lc = (unsigned char)s[left];\n                window[lc]--;\n                if (need[lc] > 0 && window[lc] < need[lc]) {\n                    formed--;\n                }\n                left++;\n            }\n        }\n        return minLen == 1e9 ? "" : s.substr(minStart, minLen);\n    }\n};`,
        approach: 'ASCII Table Sliding Window',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {\n    public String minWindow(String s, String t) {\n        if (s == null || t == null || s.length() == 0 || t.length() == 0) return "";\n        int[] need = new int[128];\n        int required = 0;\n        for (int i = 0; i < t.length(); i++) {\n            char c = t.charAt(i);\n            if (need[c] == 0) required++;\n            need[c]++;\n        }\n        int[] window = new int[128];\n        int formed = 0;\n        int left = 0;\n        int minLen = Integer.MAX_VALUE;\n        int minStart = 0;\n        for (int right = 0; right < s.length(); right++) {\n            char c = s.charAt(right);\n            window[c]++;\n            if (need[c] > 0 && window[c] == need[c]) {\n                formed++;\n            }\n            while (left <= right && formed == required) {\n                int currLen = right - left + 1;\n                if (currLen < minLen) {\n                    minLen = currLen;\n                    minStart = left;\n                }\n                char lc = s.charAt(left);\n                window[lc]--;\n                if (need[lc] > 0 && window[lc] < need[lc]) {\n                    formed--;\n                }\n                left++;\n            }\n        }\n        return minLen == Integer.MAX_VALUE ? "" : s.substring(minStart, minStart + minLen);\n    }\n}`,
        approach: 'Two Pointers Window with Formed Counter',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**\n * @param {string} s\n * @param {string} t\n * @return {string}\n */\nvar minWindow = function(s, t) {\n    if (!s || !t) return "";\n    const need = new Map();\n    for (let i = 0; i < t.length; i++) {\n        need.set(t[i], (need.get(t[i]) || 0) + 1);\n    }\n    const required = need.size;\n    const window = new Map();\n    let formed = 0;\n    let left = 0;\n    let minLen = Infinity;\n    let minStart = 0;\n    for (let right = 0; right < s.length; right++) {\n        const c = s[right];\n        window.set(c, (window.get(c) || 0) + 1);\n        if (need.has(c) && window.get(c) === need.get(c)) {\n            formed++;\n        }\n        while (left <= right && formed === required) {\n            const currLen = right - left + 1;\n            if (currLen < minLen) {\n                minLen = currLen;\n                minStart = left;\n            }\n            const lc = s[left];\n            window.set(lc, window.get(lc) - 1);\n            if (need.has(lc) && window.get(lc) < need.get(lc)) {\n                formed--;\n            }\n            left++;\n        }\n    }\n    return minLen === Infinity ? "" : s.slice(minStart, minStart + minLen);\n};`,
        approach: 'Map Dynamic Window',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  }
];

export function writeBatch1() {
  const problemsDir = path.join(rootDir, 'dataset', 'problems');
  const testsDir = path.join(rootDir, 'dataset', 'tests');

  for (const prob of BATCH1_PROBLEMS) {
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
      comparator: (prob.slug === 'group-anagrams' || prob.slug === '3sum' || prob.slug === 'top-k-frequent-elements' || prob.slug === 'two-sum-ii-input-array-is-sorted') ? 'property' : 'exact',
      method: prob.method,
      reference: `Independent algorithmic reference test for ${prob.slug}`
    };
    fs.writeFileSync(path.join(testDir, 'meta.json'), JSON.stringify(meta, null, 2) + '\n', 'utf8');
  }

  console.log(`✓ Successfully populated ${BATCH1_PROBLEMS.length} problem files and meta.json test configs`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  writeBatch1();
}
