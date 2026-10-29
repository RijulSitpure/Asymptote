import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

export const algorithms1Problems = [
  // 1. #157 read-n-characters-given-read4
  {
    slug: 'read-n-characters-given-read4',
    number: 157,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Chunked Buffer Transfer Strategy',
        text: 'The problem requires transferring characters in fixed-size chunks of four until reaching the target destination count or exhausting the underlying source.'
      },
      {
        level: 2,
        title: 'Loop Termination and Boundary Slicing',
        text: 'Repeatedly invoke the read function into an intermediate staging array. Copy elements one by one into the target destination buffer until n items are copied or end-of-file is encountered.'
      },
      {
        level: 3,
        title: 'Step-by-Step Copy Blueprint',
        text: 'Maintain copied_chars count and a temporary 4-character array. While copied_chars < n, call read4. Iterate through received characters up to read count, write to destination, and break when copied_chars equals n.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\n"""\nThe read4 API is already defined for you.\ndef read4(buf4: list[str]) -> int:\n"""\n\nclass Solution:\n    def read(self, buf: list[str], n: int) -> int:\n        copied_chars = 0\n        read_chars = 4\n        buf4 = [\'\'] * 4\n        while copied_chars < n and read_chars > 0:\n            read_chars = read4(buf4)\n            for i in range(read_chars):\n                if copied_chars == n:\n                    return copied_chars\n                buf[copied_chars] = buf4[i]\n                copied_chars += 1\n        return copied_chars\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: number of characters requested'],
      notes: 'Executes at most ceil(N / 4) reads with fixed 4-character intermediate buffer.',
      whyNaiveFails: 'Reading unbuffered streams directly into destination without bounds checks can overflow the buffer beyond n characters.',
      spaceTimeTradeoff: 'Constant extra auxiliary memory of 4 elements balances chunked API requests.',
      interviewerExpectation: 'Correct EOF handling when read4 returns fewer than 4 characters.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `"""
The read4 API is already defined for you.
def read4(buf4: list[str]) -> int:
"""

class Solution:
    def read(self, buf: list[str], n: int) -> int:
        copied_chars = 0
        read_chars = 4
        buf4 = [''] * 4
        while copied_chars < n and read_chars > 0:
            read_chars = read4(buf4)
            for i in range(read_chars):
                if copied_chars == n:
                    return copied_chars
                buf[copied_chars] = buf4[i]
                copied_chars += 1
        return copied_chars`,
        approach: 'Chunked Four-Byte Buffer Consumption',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `/**
 * The read4 API is defined in the parent class Reader4.
 *     int read4(char *buf4);
 */

class Solution {
public:
    int read(char *buf, int n) {
        int copiedChars = 0;
        int readChars = 4;
        char buf4[4];
        while (copiedChars < n && readChars > 0) {
            readChars = read4(buf4);
            for (int i = 0; i < readChars; ++i) {
                if (copiedChars == n) return copiedChars;
                buf[copiedChars++] = buf4[i];
            }
        }
        return copiedChars;
    }
};`,
        approach: 'C++ Buffer Iteration with Early Exit',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `/**
 * The read4 API is defined in the parent class Reader4.
 *     int read4(char[] buf4);
 */

public class Solution extends Reader4 {
    public int read(char[] buf, int n) {
        int copiedChars = 0;
        int readChars = 4;
        char[] buf4 = new char[4];
        while (copiedChars < n && readChars > 0) {
            readChars = read4(buf4);
            for (int i = 0; i < readChars; ++i) {
                if (copiedChars == n) return copiedChars;
                buf[copiedChars++] = buf4[i];
            }
        }
        return copiedChars;
    }
}`,
        approach: 'Java Intermediate Buffer Reader',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {function} read4
 * @return {function}
 */
var solution = function(read4) {
    /**
     * @param {character[]} buf
     * @param {number} n
     * @return {number}
     */
    return function(buf, n) {
        let copiedChars = 0;
        let readChars = 4;
        const buf4 = new Array(4);
        while (copiedChars < n && readChars > 0) {
            readChars = read4(buf4);
            for (let i = 0; i < readChars; ++i) {
                if (copiedChars === n) return copiedChars;
                buf[copiedChars++] = buf4[i];
            }
        }
        return copiedChars;
    };
};`,
        approach: 'Higher-Order Closure Stream Reader',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

class Reader4:
    def __init__(self, content):
        self.content = content
        self.ptr = 0

    def read4(self, buf4):
        count = 0
        while count < 4 and self.ptr < len(self.content):
            buf4[count] = self.content[self.ptr]
            count += 1
            self.ptr += 1
        return count

reader = Reader4("abcde")
def read4(buf4):
    return reader.read4(buf4)

with open('dataset/problems/read-n-characters-given-read4.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], {'read4': read4}, scope)
sol = scope['Solution']()
buf = [''] * 5
ans = sol.read(buf, 5)
assert ans == 5
assert "".join(buf[:ans]) == "abcde"
print("Passed read-n-characters-given-read4 tests")
`
  },

  // 2. #158 read-n-characters-given-read4-ii-call-multiple-times
  {
    slug: 'read-n-characters-given-read4-ii-call-multiple-times',
    number: 158,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Persistent Buffer Cursor Architecture',
        text: 'Multiple subsequent calls require keeping leftover unconsumed characters from previous block operations in persistent state across invocations.'
      },
      {
        level: 2,
        title: 'Pointers Across Staging Buffer',
        text: 'Store a 4-element intermediate array with head and tail index markers. Only read from the external reader when the internal buffer is completely depleted.'
      },
      {
        level: 3,
        title: 'Buffer Refill and Drain Protocol',
        text: 'While items are needed: if head equals tail, reset head to 0 and set tail to read4. If tail is 0, break. While items needed and head < tail, copy buf4[head] to destination and advance.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\n"""\nThe read4 API is already defined for you.\ndef read4(buf4: list[str]) -> int:\n"""\n\nclass Solution:\n    def __init__(self):\n        self.buf4 = [\'\'] * 4\n        self.head = 0\n        self.tail = 0\n\n    def read(self, buf: list[str], n: int) -> int:\n        idx = 0\n        while idx < n:\n            if self.head == self.tail:\n                self.head = 0\n                self.tail = read4(self.buf4)\n                if self.tail == 0:\n                    break\n            while idx < n and self.head < self.tail:\n                buf[idx] = self.buf4[self.head]\n                idx += 1\n                self.head += 1\n        return idx\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: number of characters read across calls'],
      notes: 'Each character is staged into and out of the internal buffer exactly once.',
      whyNaiveFails: 'Discarding leftover items between calls loses stream synchronization and corrupts sequential data.',
      spaceTimeTradeoff: 'Persistent 4-byte internal queue eliminates redundant external reads.',
      interviewerExpectation: 'Correct persistent head and tail cursor lifecycle across arbitrary call sizes.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `"""
The read4 API is already defined for you.
def read4(buf4: list[str]) -> int:
"""

class Solution:
    def __init__(self):
        self.buf4 = [''] * 4
        self.head = 0
        self.tail = 0

    def read(self, buf: list[str], n: int) -> int:
        idx = 0
        while idx < n:
            if self.head == self.tail:
                self.head = 0
                self.tail = read4(self.buf4)
                if self.tail == 0:
                    break
            while idx < n and self.head < self.tail:
                buf[idx] = self.buf4[self.head]
                idx += 1
                self.head += 1
        return idx`,
        approach: 'Internal Ring Buffer with Persistent Pointers',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `/**
 * The read4 API is defined in the parent class Reader4.
 *     int read4(char *buf4);
 */

class Solution {
private:
    char buf4[4];
    int head = 0;
    int tail = 0;
public:
    int read(char *buf, int n) {
        int idx = 0;
        while (idx < n) {
            if (head == tail) {
                head = 0;
                tail = read4(buf4);
                if (tail == 0) break;
            }
            while (idx < n && head < tail) {
                buf[idx++] = buf4[head++];
            }
        }
        return idx;
    }
};`,
        approach: 'Member Variable Internal Staging Queue',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `/**
 * The read4 API is defined in the parent class Reader4.
 *     int read4(char[] buf4);
 */

public class Solution extends Reader4 {
    private char[] buf4 = new char[4];
    private int head = 0;
    private int tail = 0;

    public int read(char[] buf, int n) {
        int idx = 0;
        while (idx < n) {
            if (head == tail) {
                head = 0;
                tail = read4(buf4);
                if (tail == 0) break;
            }
            while (idx < n && head < tail) {
                buf[idx++] = buf4[head++];
            }
        }
        return idx;
    }
}`,
        approach: 'Java Stateful Buffer Cursor Reader',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {function} read4
 * @return {function}
 */
var solution = function(read4) {
    const buf4 = new Array(4);
    let head = 0;
    let tail = 0;

    return function(buf, n) {
        let idx = 0;
        while (idx < n) {
            if (head === tail) {
                head = 0;
                tail = read4(buf4);
                if (tail === 0) break;
            }
            while (idx < n && head < tail) {
                buf[idx++] = buf4[head++];
            }
        }
        return idx;
    };
};`,
        approach: 'JavaScript Closure Encapsulated Internal Stream Cursor',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

class Reader4:
    def __init__(self, content):
        self.content = content
        self.ptr = 0

    def read4(self, buf4):
        count = 0
        while count < 4 and self.ptr < len(self.content):
            buf4[count] = self.content[self.ptr]
            count += 1
            self.ptr += 1
        return count

reader = Reader4("abc")
def read4(buf4):
    return reader.read4(buf4)

with open('dataset/problems/read-n-characters-given-read4-ii-call-multiple-times.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], {'read4': read4}, scope)
sol = scope['Solution']()
buf1 = [''] * 1
buf2 = [''] * 2
assert sol.read(buf1, 1) == 1
assert buf1[0] == 'a'
assert sol.read(buf2, 2) == 2
assert "".join(buf2) == "bc"
print("Passed read-n-characters-given-read4-ii tests")
`
  },

  // 3. #244 shortest-word-distance-ii
  {
    slug: 'shortest-word-distance-ii',
    number: 244,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Inverted Index Position Preprocessing',
        text: 'Precomputing the sorted index positions of every unique string allows repeated queries to be answered in linear time relative to word occurrences.'
      },
      {
        level: 2,
        title: 'Two Pointers Across Sorted Offset Lists',
        text: 'Traverse the two sorted position sequences simultaneously with two pointers. Update the minimal absolute difference and advance the pointer with the smaller index value.'
      },
      {
        level: 3,
        title: 'Merge Traversal Blueprint',
        text: 'Initialize pointers i = 0 and j = 0 for the position lists. At each step, record abs(list1[i] - list2[j]). If list1[i] < list2[j], increment i; otherwise increment j. Return the minimum distance found.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nfrom collections import defaultdict\n\nclass WordDistance:\n    def __init__(self, wordsDict: list[str]):\n        self.locations = defaultdict(list)\n        for i, w in enumerate(wordsDict):\n            self.locations[w].append(i)\n\n    def shortest(self, word1: str, word2: str) -> int:\n        l1, l2 = self.locations[word1], self.locations[word2]\n        i = j = 0\n        min_dist = float(\'inf\')\n        while i < len(l1) and j < len(l2):\n            min_dist = min(min_dist, abs(l1[i] - l2[j]))\n            if l1[i] < l2[j]:\n                i += 1\n            else:\n                j += 1\n        return min_dist\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(K1 + K2)',
      space: 'O(N)',
      variables: ['N: total words in dictionary', 'K1, K2: frequencies of queried words'],
      notes: 'Constructor runs in O(N); each query runs in linear time with respect to word frequencies.',
      whyNaiveFails: 'Scanning the original words list on each query incurs O(N) cost per repeated call.',
      spaceTimeTradeoff: 'Trading O(N) space for index arrays accelerates frequent distance queries.',
      interviewerExpectation: 'Optimal two-pointer progression over sorted index lists.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from collections import defaultdict

class WordDistance:
    def __init__(self, wordsDict: list[str]):
        self.locations = defaultdict(list)
        for i, w in enumerate(wordsDict):
            self.locations[w].append(i)

    def shortest(self, word1: str, word2: str) -> int:
        l1, l2 = self.locations[word1], self.locations[word2]
        i = j = 0
        min_dist = float('inf')
        while i < len(l1) and j < len(l2):
            min_dist = min(min_dist, abs(l1[i] - l2[j]))
            if l1[i] < l2[j]:
                i += 1
            else:
                j += 1
        return min_dist`,
        approach: 'Inverted Index with Two-Pointer Convergence',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class WordDistance {
private:
    unordered_map<string, vector<int>> locs;
public:
    WordDistance(vector<string>& wordsDict) {
        for (int i = 0; i < wordsDict.size(); ++i) {
            locs[wordsDict[i]].push_back(i);
        }
    }

    int shortest(string word1, string word2) {
        const auto& l1 = locs[word1];
        const auto& l2 = locs[word2];
        int i = 0, j = 0;
        int minDist = INT_MAX;
        while (i < l1.size() && j < l2.size()) {
            minDist = min(minDist, abs(l1[i] - l2[j]));
            if (l1[i] < l2[j]) ++i;
            else ++j;
        }
        return minDist;
    }
};`,
        approach: 'C++ Hash Map of Vectors with Linear Sweep',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.*;

class WordDistance {
    private Map<String, List<Integer>> map = new HashMap<>();

    public WordDistance(String[] wordsDict) {
        for (int i = 0; i < wordsDict.length; i++) {
            map.computeIfAbsent(wordsDict[i], k -> new ArrayList<>()).add(i);
        }
    }

    public int shortest(String word1, String word2) {
        List<Integer> l1 = map.get(word1);
        List<Integer> l2 = map.get(word2);
        int i = 0, j = 0;
        int minDist = Integer.MAX_VALUE;
        while (i < l1.size() && j < l2.size()) {
            minDist = Math.min(minDist, Math.abs(l1.get(i) - l2.get(j)));
            if (l1.get(i) < l2.get(j)) i++;
            else j++;
        }
        return minDist;
    }
}`,
        approach: 'Java HashMap of Index Lists',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {string[]} wordsDict
 */
var WordDistance = function(wordsDict) {
    this.map = new Map();
    for (let i = 0; i < wordsDict.length; i++) {
        const w = wordsDict[i];
        if (!this.map.has(w)) this.map.set(w, []);
        this.map.get(w).push(i);
    }
};

/** 
 * @param {string} word1 
 * @param {string} word2
 * @return {number}
 */
WordDistance.prototype.shortest = function(word1, word2) {
    const l1 = this.map.get(word1);
    const l2 = this.map.get(word2);
    let i = 0, j = 0;
    let minDist = Infinity;
    while (i < l1.length && j < l2.length) {
        minDist = Math.min(minDist, Math.abs(l1[i] - l2[j]));
        if (l1[i] < l2[j]) i++;
        else j++;
    }
    return minDist;
};`,
        approach: 'JavaScript Map Prototype Inverted Index',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

with open('dataset/problems/shortest-word-distance-ii.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
WordDistance = scope['WordDistance']

wd = WordDistance(["practice", "makes", "perfect", "coding", "makes"])
assert wd.shortest("coding", "practice") == 3
assert wd.shortest("makes", "coding") == 1
print("Passed shortest-word-distance-ii tests")
`
  },

  // 4. #281 zigzag-iterator
  {
    slug: 'zigzag-iterator',
    number: 281,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Round-Robin Stream Interleaving',
        text: 'Alternating between multiple non-empty collections in sequential rounds models fair scheduling across active streams.'
      },
      {
        level: 2,
        title: 'First-In First-Out Active Vector Rotation',
        text: 'Maintain active vectors along with their current read indices. Pop the head stream, emit its current element, and re-enqueue if unread items remain.'
      },
      {
        level: 3,
        title: 'Rotating Cursor Blueprint',
        text: 'Store tuples of (list, index) in a double-ended buffer. In next(), popleft(), retrieve list[index], and if index + 1 < len(list), append (list, index + 1). In hasNext(), check whether buffer is non-empty.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nfrom collections import deque\n\nclass ZigzagIterator:\n    def __init__(self, v1: list[int], v2: list[int]):\n        self.queue = deque()\n        if v1:\n            self.queue.append((v1, 0))\n        if v2:\n            self.queue.append((v2, 0))\n\n    def next(self) -> int:\n        arr, idx = self.queue.popleft()\n        val = arr[idx]\n        if idx + 1 < len(arr):\n            self.queue.append((arr, idx + 1))\n        return val\n\n    def hasNext(self) -> bool:\n        return len(self.queue) > 0\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(K)',
      variables: ['K: number of input vectors (here K = 2)'],
      notes: 'Both next() and hasNext() run in amortized O(1) time.',
      whyNaiveFails: 'Flattening both lists entirely upfront consumes extra memory and does not generalize to infinite streams.',
      spaceTimeTradeoff: 'Holding only active stream references and cursor indices minimizes auxiliary memory.',
      interviewerExpectation: 'Design that naturally scales from 2 vectors to k vectors without structural changes.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from collections import deque

class ZigzagIterator:
    def __init__(self, v1: list[int], v2: list[int]):
        self.queue = deque()
        if v1:
            self.queue.append((v1, 0))
        if v2:
            self.queue.append((v2, 0))

    def next(self) -> int:
        arr, idx = self.queue.popleft()
        val = arr[idx]
        if idx + 1 < len(arr):
            self.queue.append((arr, idx + 1))
        return val

    def hasNext(self) -> bool:
        return len(self.queue) > 0`,
        approach: 'Double-Ended FIFO Active Stream Rotation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class ZigzagIterator {
private:
    queue<pair<vector<int>::iterator, vector<int>::iterator>> q;
public:
    ZigzagIterator(vector<int>& v1, vector<int>& v2) {
        if (!v1.empty()) q.push({v1.begin(), v1.end()});
        if (!v2.empty()) q.push({v2.begin(), v2.end()});
    }

    int next() {
        auto [it, end] = q.front();
        q.pop();
        int val = *it;
        if (it + 1 != end) {
            q.push({it + 1, end});
        }
        return val;
    }

    bool hasNext() {
        return !q.empty();
    }
};`,
        approach: 'C++ Queue of Iterator Ranges',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.*;

public class ZigzagIterator {
    private Queue<Iterator<Integer>> queue = new LinkedList<>();

    public ZigzagIterator(List<Integer> v1, List<Integer> v2) {
        if (!v1.isEmpty()) queue.offer(v1.iterator());
        if (!v2.isEmpty()) queue.offer(v2.iterator());
    }

    public int next() {
        Iterator<Integer> it = queue.poll();
        int val = it.next();
        if (it.hasNext()) {
            queue.offer(it);
        }
        return val;
    }

    public boolean hasNext() {
        return !queue.isEmpty();
    }
}`,
        approach: 'Java Queue of List Iterators',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @constructor
 * @param {Integer[]} v1
 * @param {Integer[]} v2
 */
var ZigzagIterator = function(v1, v2) {
    this.queue = [];
    if (v1 && v1.length) this.queue.push({ arr: v1, idx: 0 });
    if (v2 && v2.length) this.queue.push({ arr: v2, idx: 0 });
};

/**
 * @this ZigzagIterator
 * @returns {boolean}
 */
ZigzagIterator.prototype.hasNext = function() {
    return this.queue.length > 0;
};

/**
 * @this ZigzagIterator
 * @returns {integer}
 */
ZigzagIterator.prototype.next = function() {
    const item = this.queue.shift();
    const val = item.arr[item.idx];
    if (item.idx + 1 < item.arr.length) {
        this.queue.push({ arr: item.arr, idx: item.idx + 1 });
    }
    return val;
};`,
        approach: 'JavaScript Shift-Push Stream Cycling',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

with open('dataset/problems/zigzag-iterator.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
ZigzagIterator = scope['ZigzagIterator']

it = ZigzagIterator([1, 2], [3, 4, 5, 6])
res = []
while it.hasNext():
    res.append(it.next())
assert res == [1, 3, 2, 4, 5, 6]
print("Passed zigzag-iterator tests")
`
  },

  // 5. #288 unique-word-abbreviation
  {
    slug: 'unique-word-abbreviation',
    number: 288,
    category: 'Algorithms',
    patterns: ['hash-map-lookup'],
    hints: [
      {
        level: 1,
        title: 'Condensed Key Grouping Logic',
        text: 'Words sharing the first letter, omitted character count, and last letter map to identical signature keys.'
      },
      {
        level: 2,
        title: 'Set Membership Verification Under Shared Abbreviation',
        text: 'An abbreviation is unique for a word if no word in the dictionary produces this abbreviation, or if every dictionary word producing it is identical to the queried word.'
      },
      {
        level: 3,
        title: 'Signature Lookup Blueprint',
        text: 'Compute signature: if len <= 2 return word, else word[0] + str(len - 2) + word[-1]. Store dictionary words grouped by signature in a map of sets. Return True if signature not present or set contains only the queried word.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nfrom collections import defaultdict\n\nclass ValidWordAbbr:\n    def __init__(self, dictionary: list[str]):\n        self.abbr_dict = defaultdict(set)\n        for word in dictionary:\n            abbr = self._get_abbr(word)\n            self.abbr_dict[abbr].add(word)\n\n    def _get_abbr(self, word: str) -> str:\n        if len(word) <= 2:\n            return word\n        return f"{word[0]}{len(word) - 2}{word[-1]}"\n\n    def isUnique(self, word: str) -> bool:\n        abbr = self._get_abbr(word)\n        words = self.abbr_dict.get(abbr, set())\n        return len(words) == 0 or (len(words) == 1 and word in words)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(N * L)',
      variables: ['N: words in dictionary', 'L: maximum word length'],
      notes: 'Initial construction processes all strings in O(N * L); isUnique runs in O(L) signature hashing time.',
      whyNaiveFails: 'Rechecking every dictionary word during each query runs in O(N * L) and degrades performance.',
      spaceTimeTradeoff: 'Grouping dictionary words by signature accelerates queries to constant average lookup.',
      interviewerExpectation: 'Correct handling of duplicates in dictionary and words of length 2 or fewer.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from collections import defaultdict

class ValidWordAbbr:
    def __init__(self, dictionary: list[str]):
        self.abbr_dict = defaultdict(set)
        for word in dictionary:
            abbr = self._get_abbr(word)
            self.abbr_dict[abbr].add(word)

    def _get_abbr(self, word: str) -> str:
        if len(word) <= 2:
            return word
        return f"{word[0]}{len(word) - 2}{word[-1]}"

    def isUnique(self, word: str) -> bool:
        abbr = self._get_abbr(word)
        words = self.abbr_dict.get(abbr, set())
        return len(words) == 0 or (len(words) == 1 and word in words)`,
        approach: 'Signature Map Grouping Unique Words',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class ValidWordAbbr {
private:
    unordered_map<string, unordered_set<string>> abbrMap;

    string getAbbr(const string& s) {
        if (s.length() <= 2) return s;
        return s.front() + to_string(s.length() - 2) + s.back();
    }
public:
    ValidWordAbbr(vector<string>& dictionary) {
        for (const string& w : dictionary) {
            abbrMap[getAbbr(w)].insert(w);
        }
    }

    bool isUnique(string word) {
        string abbr = getAbbr(word);
        if (!abbrMap.count(abbr)) return true;
        const auto& setWords = abbrMap[abbr];
        return setWords.size() == 1 && setWords.count(word);
    }
};`,
        approach: 'C++ Hash Map of Unordered Sets',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.*;

class ValidWordAbbr {
    private Map<String, Set<String>> map = new HashMap<>();

    private String getAbbr(String s) {
        if (s.length() <= 2) return s;
        return "" + s.charAt(0) + (s.length() - 2) + s.charAt(s.length() - 1);
    }

    public ValidWordAbbr(String[] dictionary) {
        for (String w : dictionary) {
            map.computeIfAbsent(getAbbr(w), k -> new HashSet<>()).add(w);
        }
    }

    public boolean isUnique(String word) {
        String abbr = getAbbr(word);
        Set<String> set = map.get(abbr);
        return set == null || (set.size() == 1 && set.contains(word));
    }
}`,
        approach: 'Java Map of String Sets for Abbreviation Keys',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {string[]} dictionary
 */
var ValidWordAbbr = function(dictionary) {
    this.map = new Map();
    for (const w of dictionary) {
        const abbr = this.getAbbr(w);
        if (!this.map.has(abbr)) this.map.set(abbr, new Set());
        this.map.get(abbr).add(w);
    }
};

ValidWordAbbr.prototype.getAbbr = function(word) {
    if (word.length <= 2) return word;
    return word[0] + (word.length - 2) + word[word.length - 1];
};

/** 
 * @param {string} word
 * @return {boolean}
 */
ValidWordAbbr.prototype.isUnique = function(word) {
    const abbr = this.getAbbr(word);
    const set = this.map.get(abbr);
    return !set || (set.size === 1 && set.has(word));
};`,
        approach: 'JavaScript Map and Set Abbreviation Classifier',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

with open('dataset/problems/unique-word-abbreviation.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
ValidWordAbbr = scope['ValidWordAbbr']

vwa = ValidWordAbbr(["deer", "door", "cake", "card"])
assert vwa.isUnique("dear") == False
assert vwa.isUnique("cart") == True
assert vwa.isUnique("cac") == True
assert vwa.isUnique("cake") == True
print("Passed unique-word-abbreviation tests")
`
  },

  // 6. #308 range-sum-query-2d-mutable
  {
    slug: 'range-sum-query-2d-mutable',
    number: 308,
    category: 'Algorithms',
    patterns: ['segment-tree-fenwick'],
    hints: [
      {
        level: 1,
        title: 'Two-Dimensional Prefix Range Aggregation',
        text: 'Dynamic cell updates combined with rectangle sum queries necessitate an index structure capable of logarithmic point updates and prefix sums across two dimensions.'
      },
      {
        level: 2,
        title: 'Binary Indexed Tree Over Matrix Coordinates',
        text: 'Maintain a 2D tree using lowbit isolation across both row and column axes. Point updates propagate deltas through ancestors; region queries combine four corner prefix evaluations.'
      },
      {
        level: 3,
        title: 'Coordinate Arithmetic Blueprint',
        text: 'In update(r, c, val), compute delta = val - current[r][c]. Add delta along 2D bit lines by incrementing indices by index & -index. In sumRegion, apply inclusion-exclusion: query(r2, c2) - query(r1-1, c2) - query(r2, c1-1) + query(r1-1, c1-1).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass NumMatrix:\n    def __init__(self, matrix: list[list[int]]):\n        self.m = len(matrix)\n        self.n = len(matrix[0]) if self.m > 0 else 0\n        self.vals = [[0] * self.n for _ in range(self.m)]\n        self.tree = [[0] * (self.n + 1) for _ in range(self.m + 1)]\n        for r in range(self.m):\n            for c in range(self.n):\n                self.update(r, c, matrix[r][c])\n\n    def update(self, row: int, col: int, val: int) -> None:\n        delta = val - self.vals[row][col]\n        self.vals[row][col] = val\n        r = row + 1\n        while r <= self.m:\n            c = col + 1\n            while c <= self.n:\n                self.tree[r][c] += delta\n                c += c & (-c)\n            r += r & (-r)\n\n    def _query(self, row: int, col: int) -> int:\n        total = 0\n        r = row + 1\n        while r > 0:\n            c = col + 1\n            while c > 0:\n                total += self.tree[r][c]\n                c -= c & (-c)\n            r -= r & (-r)\n        return total\n\n    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:\n        return (\n            self._query(row2, col2)\n            - self._query(row1 - 1, col2)\n            - self._query(row2, col1 - 1)\n            + self._query(row1 - 1, col1 - 1)\n        )\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(log M * log N)',
      space: 'O(M * N)',
      variables: ['M: rows in matrix', 'N: columns in matrix'],
      notes: 'Both point updates and rectangle queries execute in logarithmic time in both dimensions.',
      whyNaiveFails: 'Recomputing 2D prefix tables on every point update takes O(M * N) per write, causing timeouts on large operation sequences.',
      spaceTimeTradeoff: 'Dual-axis Binary Indexed Tree delivers balanced O(log M * log N) reads and writes.',
      interviewerExpectation: 'Correct 1-based bit manipulation and 2D inclusion-exclusion corner subtraction.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class NumMatrix:
    def __init__(self, matrix: list[list[int]]):
        self.m = len(matrix)
        self.n = len(matrix[0]) if self.m > 0 else 0
        self.vals = [[0] * self.n for _ in range(self.m)]
        self.tree = [[0] * (self.n + 1) for _ in range(self.m + 1)]
        for r in range(self.m):
            for c in range(self.n):
                self.update(r, c, matrix[r][c])

    def update(self, row: int, col: int, val: int) -> None:
        delta = val - self.vals[row][col]
        self.vals[row][col] = val
        r = row + 1
        while r <= self.m:
            c = col + 1
            while c <= self.n:
                self.tree[r][c] += delta
                c += c & (-c)
            r += r & (-r)

    def _query(self, row: int, col: int) -> int:
        total = 0
        r = row + 1
        while r > 0:
            c = col + 1
            while c > 0:
                total += self.tree[r][c]
                c -= c & (-c)
            r -= r & (-r)
        return total

    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        return (
            self._query(row2, col2)
            - self._query(row1 - 1, col2)
            - self._query(row2, col1 - 1)
            + self._query(row1 - 1, col1 - 1)
        )`,
        approach: '2D Binary Indexed Tree with Inclusion-Exclusion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class NumMatrix {
private:
    int m, n;
    vector<vector<int>> vals;
    vector<vector<int>> tree;

    int query(int row, int col) {
        int total = 0;
        for (int r = row + 1; r > 0; r -= r & -r) {
            for (int c = col + 1; c > 0; c -= c & -c) {
                total += tree[r][c];
            }
        }
        return total;
    }
public:
    NumMatrix(vector<vector<int>>& matrix) {
        m = matrix.size();
        n = m > 0 ? matrix[0].size() : 0;
        vals.assign(m, vector<int>(n, 0));
        tree.assign(m + 1, vector<int>(n + 1, 0));
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                update(r, c, matrix[r][c]);
            }
        }
    }

    void update(int row, int col, int val) {
        int delta = val - vals[row][col];
        vals[row][col] = val;
        for (int r = row + 1; r <= m; r += r & -r) {
            for (int c = col + 1; c <= n; c += c & -c) {
                tree[r][c] += delta;
            }
        }
    }

    int sumRegion(int row1, int col1, int row2, int col2) {
        return query(row2, col2) - query(row1 - 1, col2) - query(row2, col1 - 1) + query(row1 - 1, col1 - 1);
    }
};`,
        approach: 'C++ 2D Fenwick Tree Point Update',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class NumMatrix {
    private int m, n;
    private int[][] vals;
    private int[][] tree;

    public NumMatrix(int[][] matrix) {
        m = matrix.length;
        n = m > 0 ? matrix[0].length : 0;
        vals = new int[m][n];
        tree = new int[m + 1][n + 1];
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                update(r, c, matrix[r][c]);
            }
        }
    }

    public void update(int row, int col, int val) {
        int delta = val - vals[row][col];
        vals[row][col] = val;
        for (int r = row + 1; r <= m; r += r & -r) {
            for (int c = col + 1; c <= n; c += c & -c) {
                tree[r][c] += delta;
            }
        }
    }

    private int query(int row, int col) {
        int total = 0;
        for (int r = row + 1; r > 0; r -= r & -r) {
            for (int c = col + 1; c > 0; c -= c & -c) {
                total += tree[r][c];
            }
        }
        return total;
    }

    public int sumRegion(int row1, int col1, int row2, int col2) {
        return query(row2, col2) - query(row1 - 1, col2) - query(row2, col1 - 1) + query(row1 - 1, col1 - 1);
    }
}`,
        approach: 'Java 2D Binary Indexed Tree Matrix Aggregator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[][]} matrix
 */
var NumMatrix = function(matrix) {
    this.m = matrix.length;
    this.n = this.m > 0 ? matrix[0].length : 0;
    this.vals = Array.from({ length: this.m }, () => new Array(this.n).fill(0));
    this.tree = Array.from({ length: this.m + 1 }, () => new Array(this.n + 1).fill(0));
    for (let r = 0; r < this.m; r++) {
        for (let c = 0; c < this.n; c++) {
            this.update(r, c, matrix[r][c]);
        }
    }
};

/** 
 * @param {number} row 
 * @param {number} col 
 * @param {number} val
 * @return {void}
 */
NumMatrix.prototype.update = function(row, col, val) {
    const delta = val - this.vals[row][col];
    this.vals[row][col] = val;
    for (let r = row + 1; r <= this.m; r += r & -r) {
        for (let c = col + 1; c <= this.n; c += c & -c) {
            this.tree[r][c] += delta;
        }
    }
};

NumMatrix.prototype._query = function(row, col) {
    let total = 0;
    for (let r = row + 1; r > 0; r -= r & -r) {
        for (let c = col + 1; c > 0; c -= c & -c) {
            total += this.tree[r][c];
        }
    }
    return total;
};

/** 
 * @param {number} row1 
 * @param {number} col1 
 * @param {number} row2 
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
    return (
        this._query(row2, col2) -
        this._query(row1 - 1, col2) -
        this._query(row2, col1 - 1) +
        this._query(row1 - 1, col1 - 1)
    );
};`,
        approach: 'JavaScript 2D Tree with Dynamic Prefix Point Updates',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

with open('dataset/problems/range-sum-query-2d-mutable.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
NumMatrix = scope['NumMatrix']

matrix = [
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5]
]
nm = NumMatrix(matrix)
assert nm.sumRegion(2, 1, 4, 3) == 8
nm.update(3, 2, 2)
assert nm.sumRegion(2, 1, 4, 3) == 10
print("Passed range-sum-query-2d-mutable tests")
`
  },

  // 7. #339 nested-list-weight-sum
  {
    slug: 'nested-list-weight-sum',
    number: 339,
    category: 'Algorithms',
    patterns: ['tree-dfs-subproblem'],
    hints: [
      {
        level: 1,
        title: 'Recursive Depth Product Aggregation',
        text: 'Each integer value contributes to the global weighted sum scaled by its nesting level, beginning at one for the root list.'
      },
      {
        level: 2,
        title: 'Hierarchical Structure Traversal',
        text: 'Iterate over elements in the current collection. If an element is a primitive integer, multiply its value by depth. If it is a nested container, recurse with depth incremented by one.'
      },
      {
        level: 3,
        title: 'DFS Subtree Accumulator Blueprint',
        text: 'Define helper(item_list, depth). Initialize total = 0. For each item: if item.isInteger(), total += item.getInteger() * depth; else total += helper(item.getList(), depth + 1). Return total.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def depthSum(self, nestedList: list) -> int:\n        def dfs(item_list, depth):\n            total = 0\n            for item in item_list:\n                if item.isInteger():\n                    total += item.getInteger() * depth\n                else:\n                    total += dfs(item.getList(), depth + 1)\n            return total\n        return dfs(nestedList, 1)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(D)',
      variables: ['N: total nested integers and sub-lists', 'D: maximum nesting depth'],
      notes: 'Visits every element and nested list once with call stack bounded by maximum depth.',
      whyNaiveFails: 'Flattening without depth tracking loses parenthetical level context.',
      spaceTimeTradeoff: 'Call stack depth matches tree nesting level without auxiliary memory buffers.',
      interviewerExpectation: 'Handling arbitrary nesting levels and non-uniform list branches cleanly.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def depthSum(self, nestedList: list) -> int:
        def dfs(item_list, depth):
            total = 0
            for item in item_list:
                if item.isInteger():
                    total += item.getInteger() * depth
                else:
                    total += dfs(item.getList(), depth + 1)
            return total
        return dfs(nestedList, 1)`,
        approach: 'Recursive Depth-Tracking Accumulator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
private:
    int dfs(const vector<NestedInteger>& list, int depth) {
        int total = 0;
        for (const auto& item : list) {
            if (item.isInteger()) {
                total += item.getInteger() * depth;
            } else {
                total += dfs(item.getList(), depth + 1);
            }
        }
        return total;
    }
public:
    int depthSum(vector<NestedInteger>& nestedList) {
        return dfs(nestedList, 1);
    }
};`,
        approach: 'C++ Depth Recursion Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    private int dfs(List<NestedInteger> list, int depth) {
        int total = 0;
        for (NestedInteger item : list) {
            if (item.isInteger()) {
                total += item.getInteger() * depth;
            } else {
                total += dfs(item.getList(), depth + 1);
            }
        }
        return total;
    }

    public int depthSum(List<NestedInteger> nestedList) {
        return dfs(nestedList, 1);
    }
}`,
        approach: 'Java Recursive Depth Accumulator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {NestedInteger[]} nestedList
 * @return {number}
 */
var depthSum = function(nestedList) {
    function dfs(list, depth) {
        let total = 0;
        for (const item of list) {
            if (item.isInteger()) {
                total += item.getInteger() * depth;
            } else {
                total += dfs(item.getList(), depth + 1);
            }
        }
        return total;
    }
    return dfs(nestedList, 1);
};`,
        approach: 'JavaScript Recursive Depth Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

class NestedInteger:
    def __init__(self, val=None):
        if val is None:
            self._list = []
            self._int = None
        elif isinstance(val, int):
            self._int = val
            self._list = None
        else:
            self._list = val
            self._int = None

    def isInteger(self):
        return self._int is not None

    def getInteger(self):
        return self._int

    def getList(self):
        return self._list

with open('dataset/problems/nested-list-weight-sum.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
sol = scope['Solution']()

# [[1,1], 2, [1,1]]
nested = [
    NestedInteger([NestedInteger(1), NestedInteger(1)]),
    NestedInteger(2),
    NestedInteger([NestedInteger(1), NestedInteger(1)])
]
assert sol.depthSum(nested) == 10
print("Passed nested-list-weight-sum tests")
`
  },

  // 8. #352 data-stream-as-disjoint-intervals
  {
    slug: 'data-stream-as-disjoint-intervals',
    number: 352,
    category: 'Algorithms',
    patterns: ['binary-search-basic'],
    hints: [
      {
        level: 1,
        title: 'Continuous Range Coalescing',
        text: 'Adding incoming numbers into an ordered collection of non-overlapping spans requires checking whether adjacent spans can be merged together.'
      },
      {
        level: 2,
        title: 'Ordered Interval Insertion Points',
        text: 'Locate where the new value falls relative to existing disjoint intervals. Determine whether it extends the left neighbor, connects to the right neighbor, bridges both, or forms a new unit range.'
      },
      {
        level: 3,
        title: 'Four-Way Merge Blueprint',
        text: 'Locate insertion index using bisect. If already covered by left interval, return early. Check left_merge (left.end + 1 == val) and right_merge (right.start - 1 == val). Merge both by expanding left and removing right, or extend either, or insert [val, val].'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport bisect\n\nclass SummaryRanges:\n    def __init__(self):\n        self.intervals = []\n\n    def addNum(self, value: int) -> None:\n        idx = bisect.bisect_right(self.intervals, [value, float(\'inf\')])\n        if idx > 0 and self.intervals[idx - 1][1] >= value:\n            return\n\n        left_merge = idx > 0 and self.intervals[idx - 1][1] + 1 == value\n        right_merge = idx < len(self.intervals) and self.intervals[idx][0] - 1 == value\n\n        if left_merge and right_merge:\n            self.intervals[idx - 1][1] = self.intervals[idx][1]\n            self.intervals.pop(idx)\n        elif left_merge:\n            self.intervals[idx - 1][1] = value\n        elif right_merge:\n            self.intervals[idx][0] = value\n        else:\n            self.intervals.insert(idx, [value, value])\n\n    def getIntervals(self) -> list[list[int]]:\n        return self.intervals\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of active disjoint intervals'],
      notes: 'Bisection lookup takes O(log N) while array shifting takes O(N) worst-case.',
      whyNaiveFails: 'Rebuilding and sorting all discrete integers from scratch takes O(K log K) per query.',
      spaceTimeTradeoff: 'Storing only boundary pairs minimizes memory footprint while supporting fast consecutive coalescing.',
      interviewerExpectation: 'Accurate boundary detection and bridging when a single point bridges two neighboring intervals.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import bisect

class SummaryRanges:
    def __init__(self):
        self.intervals = []

    def addNum(self, value: int) -> None:
        idx = bisect.bisect_right(self.intervals, [value, float('inf')])
        if idx > 0 and self.intervals[idx - 1][1] >= value:
            return

        left_merge = idx > 0 and self.intervals[idx - 1][1] + 1 == value
        right_merge = idx < len(self.intervals) and self.intervals[idx][0] - 1 == value

        if left_merge and right_merge:
            self.intervals[idx - 1][1] = self.intervals[idx][1]
            self.intervals.pop(idx)
        elif left_merge:
            self.intervals[idx - 1][1] = value
        elif right_merge:
            self.intervals[idx][0] = value
        else:
            self.intervals.insert(idx, [value, value])

    def getIntervals(self) -> list[list[int]]:
        return self.intervals`,
        approach: 'Binary Search Insertion with Four-Way Interval Coalescing',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class SummaryRanges {
private:
    map<int, int> intervals; // start -> end
public:
    SummaryRanges() {}

    void addNum(int value) {
        auto it = intervals.upper_bound(value);
        int l = value, r = value;
        if (it != intervals.begin()) {
            auto prev = std::prev(it);
            if (prev->second >= value) return;
            if (prev->second + 1 == value) {
                l = prev->first;
                intervals.erase(prev);
            }
        }
        if (it != intervals.end() && it->first - 1 == value) {
            r = it->second;
            intervals.erase(it);
        }
        intervals[l] = r;
    }

    vector<vector<int>> getIntervals() {
        vector<vector<int>> res;
        for (const auto& [start, end] : intervals) {
            res.push_back({start, end});
        }
        return res;
    }
};`,
        approach: 'C++ Ordered Map Disjoint Intervals',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.*;

class SummaryRanges {
    private TreeMap<Integer, Integer> intervals;

    public SummaryRanges() {
        intervals = new TreeMap<>();
    }

    public void addNum(int value) {
        if (intervals.containsKey(value)) return;
        Integer low = intervals.lowerKey(value);
        Integer high = intervals.higherKey(value);

        if (low != null && intervals.get(low) >= value) {
            return;
        }

        boolean leftMerge = low != null && intervals.get(low) + 1 == value;
        boolean rightMerge = high != null && high - 1 == value;

        if (leftMerge && rightMerge) {
            intervals.put(low, intervals.get(high));
            intervals.remove(high);
        } else if (leftMerge) {
            intervals.put(low, value);
        } else if (rightMerge) {
            intervals.put(value, intervals.get(high));
            intervals.remove(high);
        } else {
            intervals.put(value, value);
        }
    }

    public int[][] getIntervals() {
        int[][] res = new int[intervals.size()][2];
        int i = 0;
        for (Map.Entry<Integer, Integer> entry : intervals.entrySet()) {
            res[i++] = new int[]{entry.getKey(), entry.getValue()};
        }
        return res;
    }
}`,
        approach: 'Java TreeMap Interval Merging',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var SummaryRanges = function() {
    this.intervals = [];
};

/** 
 * @param {number} value
 * @return {void}
 */
SummaryRanges.prototype.addNum = function(value) {
    let l = 0, r = this.intervals.length;
    while (l < r) {
        const mid = (l + r) >> 1;
        if (this.intervals[mid][0] <= value) l = mid + 1;
        else r = mid;
    }
    const idx = l;
    if (idx > 0 && this.intervals[idx - 1][1] >= value) {
        return;
    }

    const leftMerge = idx > 0 && this.intervals[idx - 1][1] + 1 === value;
    const rightMerge = idx < this.intervals.length && this.intervals[idx][0] - 1 === value;

    if (leftMerge && rightMerge) {
        this.intervals[idx - 1][1] = this.intervals[idx][1];
        this.intervals.splice(idx, 1);
    } else if (leftMerge) {
        this.intervals[idx - 1][1] = value;
    } else if (rightMerge) {
        this.intervals[idx][0] = value;
    } else {
        this.intervals.splice(idx, 0, [value, value]);
    }
};

/**
 * @return {number[][]}
 */
SummaryRanges.prototype.getIntervals = function() {
    return this.intervals;
};`,
        approach: 'JavaScript Binary Search Range Merging',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

with open('dataset/problems/data-stream-as-disjoint-intervals.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
SummaryRanges = scope['SummaryRanges']

sr = SummaryRanges()
sr.addNum(1)
assert sr.getIntervals() == [[1, 1]]
sr.addNum(3)
assert sr.getIntervals() == [[1, 1], [3, 3]]
sr.addNum(7)
assert sr.getIntervals() == [[1, 1], [3, 3], [7, 7]]
sr.addNum(2)
assert sr.getIntervals() == [[1, 3], [7, 7]]
sr.addNum(6)
assert sr.getIntervals() == [[1, 3], [6, 7]]
print("Passed data-stream-as-disjoint-intervals tests")
`
  },

  // 9. #353 design-snake-game
  {
    slug: 'design-snake-game',
    number: 353,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Ordered Body Coordinate Queue',
        text: 'The moving snake advances its leading head cell while conditionally retracting its trailing tail position upon non-food steps.'
      },
      {
        level: 2,
        title: 'Tail Eviction and Collision Verification',
        text: 'When stepping forward, pop the tail first before testing boundary limits or self-intersection, because moving into the cell vacated by the tail is valid.'
      },
      {
        level: 3,
        title: 'Movement State Blueprint',
        text: 'Store body in a double-ended buffer and body cells in a hash set. Calculate new head coordinates. Check board bounds. Pop tail and remove from set. If new head in set, return -1. If food matches new head, consume food, re-add tail, increment score. Push new head and return score.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nfrom collections import deque\n\nclass SnakeGame:\n    def __init__(self, width: int, height: int, food: list[list[int]]):\n        self.width = width\n        self.height = height\n        self.food = deque(food)\n        self.body = deque([(0, 0)])\n        self.body_set = {(0, 0)}\n        self.score = 0\n        self.directions = {\'U\': (-1, 0), \'D\': (1, 0), \'L\': (0, -1), \'R\': (0, 1)}\n\n    def move(self, direction: str) -> int:\n        dr, dc = self.directions[direction]\n        head_r, head_c = self.body[0]\n        nr, nc = head_r + dr, head_c + dc\n\n        if nr < 0 or nr >= self.height or nc < 0 or nc >= self.width:\n            return -1\n\n        tail = self.body.pop()\n        self.body_set.remove(tail)\n\n        if (nr, nc) in self.body_set:\n            return -1\n\n        if self.food and self.food[0] == [nr, nc]:\n            self.food.popleft()\n            self.body.append(tail)\n            self.body_set.add(tail)\n            self.score += 1\n\n        self.body.appendleft((nr, nc))\n        self.body_set.add((nr, nc))\n        return self.score\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(W * H + F)',
      variables: ['W, H: board dimensions', 'F: total food coordinates'],
      notes: 'Each move executes in constant time using deque push/pop and set membership checks.',
      whyNaiveFails: 'Scanning the full snake body array on every step to detect collisions takes O(L) time where L is snake length.',
      spaceTimeTradeoff: 'Dual representations (deque for sequence, hash set for coordinates) guarantees O(1) step operations.',
      interviewerExpectation: 'Correctly handling the case where the new head occupies the exact cell just vacated by the tail.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from collections import deque

class SnakeGame:
    def __init__(self, width: int, height: int, food: list[list[int]]):
        self.width = width
        self.height = height
        self.food = deque(food)
        self.body = deque([(0, 0)])
        self.body_set = {(0, 0)}
        self.score = 0
        self.directions = {'U': (-1, 0), 'D': (1, 0), 'L': (0, -1), 'R': (0, 1)}

    def move(self, direction: str) -> int:
        dr, dc = self.directions[direction]
        head_r, head_c = self.body[0]
        nr, nc = head_r + dr, head_c + dc

        if nr < 0 or nr >= self.height or nc < 0 or nc >= self.width:
            return -1

        tail = self.body.pop()
        self.body_set.remove(tail)

        if (nr, nc) in self.body_set:
            return -1

        if self.food and self.food[0] == [nr, nc]:
            self.food.popleft()
            self.body.append(tail)
            self.body_set.add(tail)
            self.score += 1

        self.body.appendleft((nr, nc))
        self.body_set.add((nr, nc))
        return self.score`,
        approach: 'Deque and Coordinate Set State Machine',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class SnakeGame {
private:
    int width, height;
    vector<vector<int>> food;
    int foodIndex = 0;
    deque<pair<int, int>> body;
    set<pair<int, int>> bodySet;
public:
    SnakeGame(int width, int height, vector<vector<int>>& food) : width(width), height(height), food(food) {
        body.push_back({0, 0});
        bodySet.insert({0, 0});
    }

    int move(string direction) {
        int dr = 0, dc = 0;
        if (direction == "U") dr = -1;
        else if (direction == "D") dr = 1;
        else if (direction == "L") dc = -1;
        else if (direction == "R") dc = 1;

        int nr = body.front().first + dr;
        int nc = body.front().second + dc;

        if (nr < 0 || nr >= height || nc < 0 || nc >= width) return -1;

        auto tail = body.back();
        body.pop_back();
        bodySet.erase(tail);

        if (bodySet.count({nr, nc})) return -1;

        if (foodIndex < food.size() && food[foodIndex][0] == nr && food[foodIndex][1] == nc) {
            foodIndex++;
            body.push_back(tail);
            bodySet.insert(tail);
        }

        body.push_front({nr, nc});
        bodySet.insert({nr, nc});
        return body.size() - 1;
    }
};`,
        approach: 'C++ Deque and Coordinate Set Body Tracker',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.*;

class SnakeGame {
    private int width, height;
    private int[][] food;
    private int foodIndex = 0;
    private Deque<Integer> body = new ArrayDeque<>();
    private Set<Integer> bodySet = new HashSet<>();

    public SnakeGame(int width, int height, int[][] food) {
        this.width = width;
        this.height = height;
        this.food = food;
        body.offerFirst(0);
        bodySet.add(0);
    }

    public int move(String direction) {
        int head = body.peekFirst();
        int r = head / width;
        int c = head % width;

        if (direction.equals("U")) r--;
        else if (direction.equals("D")) r++;
        else if (direction.equals("L")) c--;
        else if (direction.equals("R")) c++;

        if (r < 0 || r >= height || c < 0 || c >= width) return -1;

        int newHead = r * width + c;
        int tail = body.pollLast();
        bodySet.remove(tail);

        if (bodySet.contains(newHead)) return -1;

        if (foodIndex < food.length && food[foodIndex][0] == r && food[foodIndex][1] == c) {
            foodIndex++;
            body.offerLast(tail);
            bodySet.add(tail);
        }

        body.offerFirst(newHead);
        bodySet.add(newHead);
        return body.size() - 1;
    }
}`,
        approach: 'Java 1D Encoded Hash Coordinate Snake Tracker',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number} width
 * @param {number} height
 * @param {number[][]} food
 */
var SnakeGame = function(width, height, food) {
    this.width = width;
    this.height = height;
    this.food = food;
    this.foodIndex = 0;
    this.body = [[0, 0]];
    this.bodySet = new Set(['0,0']);
};

/** 
 * @param {string} direction
 * @return {number}
 */
SnakeGame.prototype.move = function(direction) {
    const dirMap = { U: [-1, 0], D: [1, 0], L: [0, -1], R: [0, 1] };
    const [dr, dc] = dirMap[direction];
    const [headR, headC] = this.body[0];
    const nr = headR + dr;
    const nc = headC + dc;

    if (nr < 0 || nr >= this.height || nc < 0 || nc >= this.width) return -1;

    const tail = this.body.pop();
    this.bodySet.delete(\`\${tail[0]},\${tail[1]}\`);

    const key = \`\${nr},\${nc}\`;
    if (this.bodySet.has(key)) return -1;

    if (this.foodIndex < this.food.length && this.food[this.foodIndex][0] === nr && this.food[this.foodIndex][1] === nc) {
        this.foodIndex++;
        this.body.push(tail);
        this.bodySet.add(\`\${tail[0]},\${tail[1]}\`);
    }

    this.body.unshift([nr, nc]);
    this.bodySet.add(key);
    return this.body.length - 1;
};`,
        approach: 'JavaScript Set and Coordinate Array Queue',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

with open('dataset/problems/design-snake-game.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
SnakeGame = scope['SnakeGame']

sg = SnakeGame(3, 2, [[1, 2], [0, 1]])
assert sg.move("R") == 0
assert sg.move("D") == 0
assert sg.move("R") == 1
assert sg.move("U") == 1
assert sg.move("L") == 2
assert sg.move("U") == -1
print("Passed design-snake-game tests")
`
  },

  // 10. #364 nested-list-weight-sum-ii
  {
    slug: 'nested-list-weight-sum-ii',
    number: 364,
    category: 'Algorithms',
    patterns: ['tree-bfs-level-order'],
    hints: [
      {
        level: 1,
        title: 'Inverted Depth Cumulative Aggregation',
        text: 'Integers located at shallow depths need higher multipliers than integers located deeper down, with leaf-most elements weighted by one.'
      },
      {
        level: 2,
        title: 'Cumulative Level Prefix Summation',
        text: 'Instead of finding maximum depth first, iterate through levels. Accumulate the sum of integers encountered so far; at each level transition, add this running unweighted total to the answer.'
      },
      {
        level: 3,
        title: 'Single-Pass BFS Blueprint',
        text: 'Initialize unweighted = 0 and weighted = 0. While current level list is non-empty: iterate items; add integers to unweighted; collect sublists into next_level. Add unweighted to weighted. Repeat with curr_level = next_level.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def depthSumInverse(self, nestedList: list) -> int:\n        unweighted = 0\n        weighted = 0\n        curr_level = nestedList\n        while curr_level:\n            next_level = []\n            for item in curr_level:\n                if item.isInteger():\n                    unweighted += item.getInteger()\n                else:\n                    next_level.extend(item.getList())\n            weighted += unweighted\n            curr_level = next_level\n        return weighted\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: total elements across all nested levels'],
      notes: 'Single pass BFS accumulates weights without a preliminary depth-measuring pass.',
      whyNaiveFails: 'A two-pass approach that computes maxDepth then recurses incurs redundant traversals and extra overhead.',
      spaceTimeTradeoff: 'Level array holds at most one horizontal breadth layer at a time.',
      interviewerExpectation: 'Accumulating unweighted sums across BFS steps to avoid a separate maximum depth pass.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def depthSumInverse(self, nestedList: list) -> int:
        unweighted = 0
        weighted = 0
        curr_level = nestedList
        while curr_level:
            next_level = []
            for item in curr_level:
                if item.isInteger():
                    unweighted += item.getInteger()
                else:
                    next_level.extend(item.getList())
            weighted += unweighted
            curr_level = next_level
        return weighted`,
        approach: 'Single-Pass BFS Level Sum Accumulator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int depthSumInverse(vector<NestedInteger>& nestedList) {
        int unweighted = 0, weighted = 0;
        vector<NestedInteger> curr = nestedList;
        while (!curr.empty()) {
            vector<NestedInteger> nextLevel;
            for (const auto& item : curr) {
                if (item.isInteger()) {
                    unweighted += item.getInteger();
                } else {
                    const auto& sub = item.getList();
                    nextLevel.insert(nextLevel.end(), sub.begin(), sub.end());
                }
            }
            weighted += unweighted;
            curr = move(nextLevel);
        }
        return weighted;
    }
};`,
        approach: 'C++ BFS Level Accumulation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int depthSumInverse(List<NestedInteger> nestedList) {
        int unweighted = 0, weighted = 0;
        List<NestedInteger> curr = nestedList;
        while (!curr.isEmpty()) {
            List<NestedInteger> nextLevel = new ArrayList<>();
            for (NestedInteger item : curr) {
                if (item.isInteger()) {
                    unweighted += item.getInteger();
                } else {
                    nextLevel.addAll(item.getList());
                }
            }
            weighted += unweighted;
            curr = nextLevel;
        }
        return weighted;
    }
}`,
        approach: 'Java Level-by-Level Inverted Depth Accumulator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {NestedInteger[]} nestedList
 * @return {number}
 */
var depthSumInverse = function(nestedList) {
    let unweighted = 0;
    let weighted = 0;
    let curr = nestedList;
    while (curr.length > 0) {
        const nextLevel = [];
        for (const item of curr) {
            if (item.isInteger()) {
                unweighted += item.getInteger();
            } else {
                nextLevel.push(...item.getList());
            }
        }
        weighted += unweighted;
        curr = nextLevel;
    }
    return weighted;
};`,
        approach: 'JavaScript BFS Running Prefix Sum',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

class NestedInteger:
    def __init__(self, val=None):
        if val is None:
            self._list = []
            self._int = None
        elif isinstance(val, int):
            self._int = val
            self._list = None
        else:
            self._list = val
            self._int = None

    def isInteger(self):
        return self._int is not None

    def getInteger(self):
        return self._int

    def getList(self):
        return self._list

with open('dataset/problems/nested-list-weight-sum-ii.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
sol = scope['Solution']()

# [[1,1], 2, [1,1]] -> max depth is 2. 2 is at depth 1 (weight 2), 1s are at depth 2 (weight 1).
# 2*2 + 1*1*4 = 4 + 4 = 8
nested = [
    NestedInteger([NestedInteger(1), NestedInteger(1)]),
    NestedInteger(2),
    NestedInteger([NestedInteger(1), NestedInteger(1)])
]
assert sol.depthSumInverse(nested) == 8
print("Passed nested-list-weight-sum-ii tests")
`
  },

  // 11. #379 design-phone-directory
  {
    slug: 'design-phone-directory',
    number: 379,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Resource Pool Allocation Management',
        text: 'Assigning, verifying, and recycling numbers from a fixed numeric capacity requires constant-time membership tracking and extraction.'
      },
      {
        level: 2,
        title: 'Available Set for Constant Queries',
        text: 'A hash set or queue tracking unused numbers provides instant assignment via pop and idempotent recycling through insertion.'
      },
      {
        level: 3,
        title: 'Set-Based Directory Blueprint',
        text: 'Initialize available = set(range(maxNumbers)). In get(): if empty return -1, else pop and return. In check(n): return n in available. In release(n): add n to available.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass PhoneDirectory:\n    def __init__(self, maxNumbers: int):\n        self.available = set(range(maxNumbers))\n\n    def get(self) -> int:\n        if not self.available:\n            return -1\n        return self.available.pop()\n\n    def check(self, number: int) -> bool:\n        return number in self.available\n\n    def release(self, number: int) -> None:\n        self.available.add(number)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(N)',
      variables: ['N: maxNumbers capacity'],
      notes: 'All operations (get, check, release) execute in O(1) average time.',
      whyNaiveFails: 'Scanning a linear array of booleans on get() degrades allocation time to O(N).',
      spaceTimeTradeoff: 'A set of available slots delivers constant-time allocation and recycling.',
      interviewerExpectation: 'Idempotent release and constant-time check operations.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class PhoneDirectory:
    def __init__(self, maxNumbers: int):
        self.available = set(range(maxNumbers))

    def get(self) -> int:
        if not self.available:
            return -1
        return self.available.pop()

    def check(self, number: int) -> bool:
        return number in self.available

    def release(self, number: int) -> None:
        self.available.add(number)`,
        approach: 'Set-Based Constant Time Resource Pool',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class PhoneDirectory {
private:
    unordered_set<int> available;
public:
    PhoneDirectory(int maxNumbers) {
        for (int i = 0; i < maxNumbers; ++i) {
            available.insert(i);
        }
    }

    int get() {
        if (available.empty()) return -1;
        auto it = available.begin();
        int val = *it;
        available.erase(it);
        return val;
    }

    bool check(int number) {
        return available.count(number) > 0;
    }

    void release(int number) {
        available.insert(number);
    }
};`,
        approach: 'C++ Unordered Set Resource Manager',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.*;

class PhoneDirectory {
    private Set<Integer> available = new HashSet<>();

    public PhoneDirectory(int maxNumbers) {
        for (int i = 0; i < maxNumbers; i++) {
            available.add(i);
        }
    }

    public int get() {
        if (available.isEmpty()) return -1;
        Iterator<Integer> it = available.iterator();
        int val = it.next();
        it.remove();
        return val;
    }

    public boolean check(int number) {
        return available.contains(number);
    }

    public void release(int number) {
        available.add(number);
    }
}`,
        approach: 'Java HashSet Pool Allocator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number} maxNumbers
 */
var PhoneDirectory = function(maxNumbers) {
    this.available = new Set();
    for (let i = 0; i < maxNumbers; i++) {
        this.available.add(i);
    }
};

/**
 * @return {number}
 */
PhoneDirectory.prototype.get = function() {
    if (this.available.size === 0) return -1;
    const val = this.available.values().next().value;
    this.available.delete(val);
    return val;
};

/** 
 * @param {number} number
 * @return {boolean}
 */
PhoneDirectory.prototype.check = function(number) {
    return this.available.has(number);
};

/** 
 * @param {number} number
 * @return {void}
 */
PhoneDirectory.prototype.release = function(number) {
    this.available.add(number);
};`,
        approach: 'JavaScript Set Iterator Allocation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

with open('dataset/problems/design-phone-directory.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
PhoneDirectory = scope['PhoneDirectory']

dir = PhoneDirectory(3)
n1 = dir.get()
assert n1 in [0, 1, 2]
assert dir.check(n1) == False
dir.release(n1)
assert dir.check(n1) == True
print("Passed design-phone-directory tests")
`
  },

  // 12. #381 insert-delete-getrandom-o1-duplicates-allowed
  {
    slug: 'insert-delete-getrandom-o1-duplicates-allowed',
    number: 381,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Multi-Set Random Sampling Structure',
        text: 'Supporting duplicate elements while guaranteeing equal probability random picks in constant time requires contiguous array indexing paired with inverted index groupings.'
      },
      {
        level: 2,
        title: 'Swap with Back for Constant Removal',
        text: 'Store values in a contiguous array. Maintain a map from each value to the set of its indices in the array. To delete, swap the target value index with the last element of the array.'
      },
      {
        level: 3,
        title: 'Index Set Reassignment Blueprint',
        text: 'On remove(val): pop an index from indices[val]. Let last_val = vals[-1]. If remove_idx does not equal last_idx, overwrite vals[remove_idx] = last_val, update indices[last_val] by removing last_idx and adding remove_idx. Pop vals.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport random\nfrom collections import defaultdict\n\nclass RandomizedCollection:\n    def __init__(self):\n        self.vals = []\n        self.indices = defaultdict(set)\n\n    def insert(self, val: int) -> bool:\n        not_present = len(self.indices[val]) == 0\n        self.indices[val].add(len(self.vals))\n        self.vals.append(val)\n        return not_present\n\n    def remove(self, val: int) -> bool:\n        if not self.indices[val]:\n            return False\n        remove_idx = self.indices[val].pop()\n        last_val = self.vals[-1]\n        last_idx = len(self.vals) - 1\n\n        if remove_idx != last_idx:\n            self.vals[remove_idx] = last_val\n            self.indices[last_val].remove(last_idx)\n            self.indices[last_val].add(remove_idx)\n\n        self.vals.pop()\n        return True\n\n    def getRandom(self) -> int:\n        return random.choice(self.vals)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(N)',
      variables: ['N: total elements in collection'],
      notes: 'All operations execute in O(1) amortized time.',
      whyNaiveFails: 'Array deletion without swapping takes O(N) due to element shifting; hash sets without arrays cannot pick random items in uniform O(1).',
      spaceTimeTradeoff: 'Index sets maintain exact array positions to enable constant-time swaps.',
      interviewerExpectation: 'Careful handling of edge cases where the removed item is already at the last position of the array.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import random
from collections import defaultdict

class RandomizedCollection:
    def __init__(self):
        self.vals = []
        self.indices = defaultdict(set)

    def insert(self, val: int) -> bool:
        not_present = len(self.indices[val]) == 0
        self.indices[val].add(len(self.vals))
        self.vals.append(val)
        return not_present

    def remove(self, val: int) -> bool:
        if not self.indices[val]:
            return False
        remove_idx = self.indices[val].pop()
        last_val = self.vals[-1]
        last_idx = len(self.vals) - 1

        if remove_idx != last_idx:
            self.vals[remove_idx] = last_val
            self.indices[last_val].remove(last_idx)
            self.indices[last_val].add(remove_idx)

        self.vals.pop()
        return True

    def getRandom(self) -> int:
        return random.choice(self.vals)`,
        approach: 'Dynamic Array with Index Set Multi-Map',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class RandomizedCollection {
private:
    vector<int> vals;
    unordered_map<int, unordered_set<int>> indices;
public:
    RandomizedCollection() {}

    bool insert(int val) {
        bool notPresent = indices[val].empty();
        indices[val].insert(vals.size());
        vals.push_back(val);
        return notPresent;
    }

    bool remove(int val) {
        if (indices[val].empty()) return false;
        int removeIdx = *indices[val].begin();
        indices[val].erase(removeIdx);

        int lastIdx = vals.size() - 1;
        int lastVal = vals.back();

        if (removeIdx != lastIdx) {
            vals[removeIdx] = lastVal;
            indices[lastVal].erase(lastIdx);
            indices[lastVal].insert(removeIdx);
        }
        vals.pop_back();
        return true;
    }

    int getRandom() {
        return vals[rand() % vals.size()];
    }
};`,
        approach: 'C++ Vector with Unordered Map of Index Sets',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.*;

class RandomizedCollection {
    private List<Integer> vals = new ArrayList<>();
    private Map<Integer, Set<Integer>> indices = new HashMap<>();
    private Random rand = new Random();

    public RandomizedCollection() {}

    public boolean insert(int val) {
        boolean notPresent = !indices.containsKey(val) || indices.get(val).isEmpty();
        indices.computeIfAbsent(val, k -> new LinkedHashSet<>()).add(vals.size());
        vals.add(val);
        return notPresent;
    }

    public boolean remove(int val) {
        if (!indices.containsKey(val) || indices.get(val).isEmpty()) return false;
        int removeIdx = indices.get(val).iterator().next();
        indices.get(val).remove(removeIdx);

        int lastIdx = vals.size() - 1;
        int lastVal = vals.get(lastIdx);

        if (removeIdx != lastIdx) {
            vals.set(removeIdx, lastVal);
            indices.get(lastVal).remove(lastIdx);
            indices.get(lastVal).add(removeIdx);
        }
        vals.remove(lastIdx);
        return true;
    }

    public int getRandom() {
        return vals.get(rand.nextInt(vals.size()));
    }
}`,
        approach: 'Java ArrayList with LinkedHashSet of Indices',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var RandomizedCollection = function() {
    this.vals = [];
    this.indices = new Map();
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedCollection.prototype.insert = function(val) {
    const notPresent = !this.indices.has(val) || this.indices.get(val).size === 0;
    if (!this.indices.has(val)) this.indices.set(val, new Set());
    this.indices.get(val).add(this.vals.length);
    this.vals.push(val);
    return notPresent;
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedCollection.prototype.remove = function(val) {
    if (!this.indices.has(val) || this.indices.get(val).size === 0) return false;
    const set = this.indices.get(val);
    const removeIdx = set.values().next().value;
    set.delete(removeIdx);

    const lastIdx = this.vals.length - 1;
    const lastVal = this.vals[lastIdx];

    if (removeIdx !== lastIdx) {
        this.vals[removeIdx] = lastVal;
        const lastSet = this.indices.get(lastVal);
        lastSet.delete(lastIdx);
        lastSet.add(removeIdx);
    }
    this.vals.pop();
    return true;
};

/**
 * @return {number}
 */
RandomizedCollection.prototype.getRandom = function() {
    const idx = Math.floor(Math.random() * this.vals.length);
    return this.vals[idx];
};`,
        approach: 'JavaScript Array Swapping with Index Map of Sets',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

with open('dataset/problems/insert-delete-getrandom-o1-duplicates-allowed.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
RandomizedCollection = scope['RandomizedCollection']

rc = RandomizedCollection()
assert rc.insert(1) == True
assert rc.insert(1) == False
assert rc.insert(2) == True
assert rc.getRandom() in [1, 2]
assert rc.remove(1) == True
assert rc.getRandom() in [1, 2]
print("Passed insert-delete-getrandom-o1-duplicates-allowed tests")
`
  },

  // 13. #382 linked-list-random-node
  {
    slug: 'linked-list-random-node',
    number: 382,
    category: 'Algorithms',
    patterns: ['linked-list-pointers'],
    hints: [
      {
        level: 1,
        title: 'Streaming Reservoir Node Selection',
        text: 'Choosing a node uniformly at random from a singly linked list without prior knowledge of its length can be solved in a single sequential pass.'
      },
      {
        level: 2,
        title: 'Probabilistic Replacement Over Stream',
        text: 'As you inspect the k-th node in the list, replace the currently selected node with probability 1 / k. Mathematical induction proves each node has exactly 1 / n probability.'
      },
      {
        level: 3,
        title: 'Reservoir Sampling Blueprint',
        text: 'Set chosen = head.val, scope = 1, curr = head.next. While curr is not None: generate random float between 0 and 1; if less than 1 / (scope + 1), update chosen = curr.val. Increment scope and curr = curr.next. Return chosen.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport random\n\nclass Solution:\n    def __init__(self, head: Optional[ListNode]):\n        self.head = head\n\n    def getRandom(self) -> int:\n        scope = 1\n        chosen = self.head.val\n        curr = self.head.next\n        while curr:\n            if random.random() < 1 / (scope + 1):\n                chosen = curr.val\n            scope += 1\n            curr = curr.next\n        return chosen\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: number of nodes in linked list'],
      notes: 'Reservoir sampling uses constant auxiliary space without copying list elements.',
      whyNaiveFails: 'Storing all values in an array uses O(N) memory, which fails when the stream exceeds local capacity.',
      spaceTimeTradeoff: 'Constant extra memory achieves uniform random selection at the cost of O(N) traversal per pick.',
      interviewerExpectation: 'Understanding reservoir sampling proof where probability at node k is 1/k * (k/(k+1)) * ... = 1/n.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import random

class Solution:
    def __init__(self, head: Optional[ListNode]):
        self.head = head

    def getRandom(self) -> int:
        scope = 1
        chosen = self.head.val
        curr = self.head.next
        while curr:
            if random.random() < 1 / (scope + 1):
                chosen = curr.val
            scope += 1
            curr = curr.next
        return chosen`,
        approach: 'Reservoir Sampling Single Pass Selection',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
private:
    ListNode* head;
public:
    Solution(ListNode* head) : head(head) {}

    int getRandom() {
        int scope = 1;
        int chosen = head->val;
        ListNode* curr = head->next;
        while (curr) {
            if (rand() % (scope + 1) == 0) {
                chosen = curr->val;
            }
            scope++;
            curr = curr->next;
        }
        return chosen;
    }
};`,
        approach: 'C++ Reservoir Sampling',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.Random;

class Solution {
    private ListNode head;
    private Random rand = new Random();

    public Solution(ListNode head) {
        this.head = head;
    }

    public int getRandom() {
        int scope = 1;
        int chosen = head.val;
        ListNode curr = head.next;
        while (curr != null) {
            if (rand.nextInt(scope + 1) == 0) {
                chosen = curr.val;
            }
            scope++;
            curr = curr.next;
        }
        return chosen;
    }
}`,
        approach: 'Java Reservoir Sampling with O(1) Extra Space',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {ListNode} head
 */
var Solution = function(head) {
    this.head = head;
};

/**
 * @return {number}
 */
Solution.prototype.getRandom = function() {
    let scope = 1;
    let chosen = this.head.val;
    let curr = this.head.next;
    while (curr) {
        if (Math.random() < 1 / (scope + 1)) {
            chosen = curr.val;
        }
        scope++;
        curr = curr.next;
    }
    return chosen;
};`,
        approach: 'JavaScript Reservoir Sampling Stream Picker',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

with open('dataset/problems/linked-list-random-node.json') as f:
    prob = json.load(f)

scope = {'Optional': None, 'ListNode': ListNode}
exec(prob['solutions'][0]['code'], scope)
Solution = scope['Solution']

head = ListNode(1, ListNode(2, ListNode(3)))
sol = Solution(head)
counts = {1: 0, 2: 0, 3: 0}
for _ in range(300):
    counts[sol.getRandom()] += 1
assert all(c > 0 for c in counts.values())
print("Passed linked-list-random-node tests")
`
  },

  // 14. #385 mini-parser
  {
    slug: 'mini-parser',
    number: 385,
    category: 'Algorithms',
    patterns: ['stack-parentheses-parser'],
    hints: [
      {
        level: 1,
        title: 'Grammar Syntax Tree Tokenization',
        text: 'Nested bracket notation defines an explicit parenthetical tree structure where inner lists are nested inside outer enclosing structures.'
      },
      {
        level: 2,
        title: 'Frame Stack for Nested Contexts',
        text: 'Push a new container upon opening brackets. Parse numeric tokens sequentially and attach them to the active top frame. On closing brackets, pop the child and nest it into its parent.'
      },
      {
        level: 3,
        title: 'Stack Parser Blueprint',
        text: 'If string does not start with [, return single integer. Otherwise iterate characters: on [ push NestedInteger; on digits accumulate num with sign; on comma or ] attach completed number; on ] pop container and append to top if stack depth > 1.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def deserialize(self, s: str) -> NestedInteger:\n        if not s.startswith(\'[\'):\n            return NestedInteger(int(s))\n        stack = []\n        num = None\n        sign = 1\n        for ch in s:\n            if ch == \'[\':\n                stack.append(NestedInteger())\n            elif ch == \'-\':\n                sign = -1\n            elif ch.isdigit():\n                num = (num or 0) * 10 + int(ch)\n            elif ch in \',]\':\n                if num is not None:\n                    stack[-1].add(NestedInteger(sign * num))\n                    num = None\n                    sign = 1\n                if ch == \']\' and len(stack) > 1:\n                    popped = stack.pop()\n                    stack[-1].add(popped)\n        return stack[0]\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: length of serialized string'],
      notes: 'Processes each character exactly once using stack depth bounded by nesting level.',
      whyNaiveFails: 'Simple string splitting breaks due to commas appearing inside deeper nested sub-lists.',
      spaceTimeTradeoff: 'Explicit frame stack maintains parent-child hierarchical ownership cleanly.',
      interviewerExpectation: 'Correct handling of signed negative numbers and single integer strings without brackets.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def deserialize(self, s: str) -> NestedInteger:
        if not s.startswith('['):
            return NestedInteger(int(s))
        stack = []
        num = None
        sign = 1
        for ch in s:
            if ch == '[':
                stack.append(NestedInteger())
            elif ch == '-':
                sign = -1
            elif ch.isdigit():
                num = (num or 0) * 10 + int(ch)
            elif ch in ',]':
                if num is not None:
                    stack[-1].add(NestedInteger(sign * num))
                    num = None
                    sign = 1
                if ch == ']' and len(stack) > 1:
                    popped = stack.pop()
                    stack[-1].add(popped)
        return stack[0]`,
        approach: 'Stack-Based Recursive Tree Parser',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    NestedInteger deserialize(string s) {
        if (s.empty()) return NestedInteger();
        if (s[0] != '[') return NestedInteger(stoi(s));

        stack<NestedInteger> st;
        int num = 0;
        int sign = 1;
        bool hasNum = false;

        for (int i = 0; i < s.length(); ++i) {
            char ch = s[i];
            if (ch == '[') {
                st.push(NestedInteger());
            } else if (ch == '-') {
                sign = -1;
            } else if (isdigit(ch)) {
                num = num * 10 + (ch - '0');
                hasNum = true;
            } else if (ch == ',' || ch == ']') {
                if (hasNum) {
                    st.top().add(NestedInteger(sign * num));
                    num = 0;
                    sign = 1;
                    hasNum = false;
                }
                if (ch == ']' && st.size() > 1) {
                    NestedInteger top = st.top();
                    st.pop();
                    st.top().add(top);
                }
            }
        }
        return st.top();
    }
};`,
        approach: 'C++ Stack-Based Character Parser',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.*;

class Solution {
    public NestedInteger deserialize(String s) {
        if (!s.startsWith("[")) {
            return new NestedInteger(Integer.parseInt(s));
        }
        Deque<NestedInteger> stack = new ArrayDeque<>();
        int num = 0;
        int sign = 1;
        boolean hasNum = false;

        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch == '[') {
                stack.push(new NestedInteger());
            } else if (ch == '-') {
                sign = -1;
            } else if (Character.isDigit(ch)) {
                num = num * 10 + (ch - '0');
                hasNum = true;
            } else if (ch == ',' || ch == ']') {
                if (hasNum) {
                    stack.peek().add(new NestedInteger(sign * num));
                    num = 0;
                    sign = 1;
                    hasNum = false;
                }
                if (ch == ']' && stack.size() > 1) {
                    NestedInteger popped = stack.pop();
                    stack.peek().add(popped);
                }
            }
        }
        return stack.peek();
    }
}`,
        approach: 'Java Stack Frame Deserializer',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {string} s
 * @return {NestedInteger}
 */
var deserialize = function(s) {
    if (!s.startsWith('[')) {
        return new NestedInteger(parseInt(s, 10));
    }
    const stack = [];
    let num = null;
    let sign = 1;

    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (ch === '[') {
            stack.push(new NestedInteger());
        } else if (ch === '-') {
            sign = -1;
        } else if (ch >= '0' && ch <= '9') {
            num = (num || 0) * 10 + parseInt(ch, 10);
        } else if (ch === ',' || ch === ']') {
            if (num !== null) {
                stack[stack.length - 1].add(new NestedInteger(sign * num));
                num = null;
                sign = 1;
            }
            if (ch === ']' && stack.length > 1) {
                const popped = stack.pop();
                stack[stack.length - 1].add(popped);
            }
        }
    }
    return stack[0];
};`,
        approach: 'JavaScript Stack Parser Tokenizer',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json

class NestedInteger:
    def __init__(self, val=None):
        if val is None:
            self._list = []
            self._int = None
        else:
            self._int = val
            self._list = None

    def isInteger(self):
        return self._int is not None

    def getInteger(self):
        return self._int

    def getList(self):
        return self._list

    def add(self, elem):
        if self._list is None:
            self._list = []
        self._list.append(elem)

with open('dataset/problems/mini-parser.json') as f:
    prob = json.load(f)

scope = {'NestedInteger': NestedInteger}
exec(prob['solutions'][0]['code'], scope)
sol = scope['Solution']()

res1 = sol.deserialize("324")
assert res1.isInteger() and res1.getInteger() == 324

res2 = sol.deserialize("[123,[456,[789]]]")
assert not res2.isInteger()
assert len(res2.getList()) == 2
print("Passed mini-parser tests")
`
  }
];

export function writeAlgorithms1Files() {
  for (const item of algorithms1Problems) {
    const probData = {
      slug: item.slug,
      number: item.number,
      category: item.category,
      patterns: item.patterns,
      hints: item.hints,
      complexity: item.complexity,
      solutions: item.solutions,
      review: {
        status: 'tested',
        acceptedOnLeetCode: null,
        reviewer: null
      },
      updated: '2026-10-30T00:00:00.000Z'
    };

    const probPath = path.join(rootDir, 'dataset/problems', `${item.slug}.json`);
    fs.writeFileSync(probPath, JSON.stringify(probData, null, 2) + '\n', 'utf8');

    const testDir = path.join(rootDir, 'dataset/tests', item.slug);
    if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true });

    const metaData = { runner: 'python', testKind: 'deterministic' };
    fs.writeFileSync(path.join(testDir, 'meta.json'), JSON.stringify(metaData, null, 2) + '\n', 'utf8');
    fs.writeFileSync(path.join(testDir, 'test.py'), item.testPy, 'utf8');

    console.log(`Generated: #${item.number} ${item.slug} [${item.category}]`);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  writeAlgorithms1Files();
}
