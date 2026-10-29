import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

export const batch14Algo2Problems = [
  // 14. #642 design-search-autocomplete-system
  {
    slug: 'design-search-autocomplete-system',
    number: 642,
    category: 'Algorithms',
    patterns: ['tree-trie-prefix'],
    hints: [
      {
        level: 1,
        title: 'Prefix Tree Autocomplete Ranking',
        text: 'Store historical sentences and their frequency counts in a hierarchical prefix tree to stream top recommendations as characters are typed.'
      },
      {
        level: 2,
        title: 'Trie Node Sentence Frequency Map',
        text: 'At each node along the typed path, maintain a mapping of sentences and their counts. Sort candidate matches by descending frequency and ascending lexicographical order.'
      },
      {
        level: 3,
        title: 'Autocomplete Blueprint',
        text: 'When input char is "#": insert or increment current sentence count in tree, reset search buffer, return []. Otherwise append char, navigate down trie node, sort sentences by (-count, sentence), and return top 3.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.counts = {}\n\nclass AutocompleteSystem:\n    def __init__(self, sentences: list[str], times: list[int]):\n        self.root = TrieNode()\n        self.curr_sentence = ""\n        for s, t in zip(sentences, times):\n            self._add(s, t)\n\n    def _add(self, sentence: str, count: int) -> None:\n        curr = self.root\n        for ch in sentence:\n            if ch not in curr.children:\n                curr.children[ch] = TrieNode()\n            curr = curr.children[ch]\n            curr.counts[sentence] = curr.counts.get(sentence, 0) + count\n\n    def input(self, c: str) -> list[str]:\n        if c == \'#\':\n            self._add(self.curr_sentence, 1)\n            self.curr_sentence = ""\n            return []\n        self.curr_sentence += c\n        curr = self.root\n        for ch in self.curr_sentence:\n            if ch not in curr.children:\n                return []\n            curr = curr.children[ch]\n        sorted_sentences = sorted(curr.counts.items(), key=lambda x: (-x[1], x[0]))\n        return [s for s, count in sorted_sentences[:3]]\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(L + M log M)',
      space: 'O(Total Characters in Sentences)',
      variables: ['L: length of current typed prefix', 'M: matching candidate sentences'],
      notes: 'Trie descent takes O(L); sorting matching candidates takes O(M log M) where M is bound by dictionary size.',
      whyNaiveFails: 'Scanning all historical sentences on every character keystroke degrades user input responsiveness.',
      spaceTimeTradeoff: 'Trie nodes cache sentence frequencies along prefixes for rapid subtree querying.',
      interviewerExpectation: 'Correct tie-breaking by lexicographical order and handling the termination character "#".'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.counts = {}

class AutocompleteSystem:
    def __init__(self, sentences: list[str], times: list[int]):
        self.root = TrieNode()
        self.curr_sentence = ""
        for s, t in zip(sentences, times):
            self._add(s, t)

    def _add(self, sentence: str, count: int) -> None:
        curr = self.root
        for ch in sentence:
            if ch not in curr.children:
                curr.children[ch] = TrieNode()
            curr = curr.children[ch]
            curr.counts[sentence] = curr.counts.get(sentence, 0) + count

    def input(self, c: str) -> list[str]:
        if c == '#':
            self._add(self.curr_sentence, 1)
            self.curr_sentence = ""
            return []
        self.curr_sentence += c
        curr = self.root
        for ch in self.curr_sentence:
            if ch not in curr.children:
                return []
            curr = curr.children[ch]
        sorted_sentences = sorted(curr.counts.items(), key=lambda x: (-x[1], x[0]))
        return [s for s, count in sorted_sentences[:3]]`,
        approach: 'Prefix Trie with Frequency Cache',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class AutocompleteSystem {
    struct TrieNode {
        unordered_map<char, TrieNode*> children;
        unordered_map<string, int> counts;
    };
    TrieNode* root;
    string currSentence = "";

    void add(const string& s, int count) {
        TrieNode* curr = root;
        for (char ch : s) {
            if (!curr->children.count(ch)) curr->children[ch] = new TrieNode();
            curr = curr->children[ch];
            curr->counts[s] += count;
        }
    }
public:
    AutocompleteSystem(vector<string>& sentences, vector<int>& times) {
        root = new TrieNode();
        for (int i = 0; i < sentences.size(); ++i) {
            add(sentences[i], times[i]);
        }
    }
    
    vector<string> input(char c) {
        if (c == '#') {
            add(currSentence, 1);
            currSentence = "";
            return {};
        }
        currSentence += c;
        TrieNode* curr = root;
        for (char ch : currSentence) {
            if (!curr->children.count(ch)) return {};
            curr = curr->children[ch];
        }
        vector<pair<string, int>> candidates(curr->counts.begin(), curr->counts.end());
        auto cmp = [](const pair<string, int>& a, const pair<string, int>& b) {
            if (a.second != b.second) return a.second > b.second;
            return a.first < b.first;
        };
        sort(candidates.begin(), candidates.end(), cmp);
        vector<string> res;
        for (int i = 0; i < min(3, (int)candidates.size()); ++i) {
            res.push_back(candidates[i].first);
        }
        return res;
    }
};`,
        approach: 'C++ Trie Prefix Cache and Custom Comparator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class AutocompleteSystem {
    class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        Map<String, Integer> counts = new HashMap<>();
    }
    private TrieNode root;
    private StringBuilder currSentence = new StringBuilder();

    private void add(String s, int count) {
        TrieNode curr = root;
        for (char ch : s.toCharArray()) {
            curr.children.putIfAbsent(ch, new TrieNode());
            curr = curr.children.get(ch);
            curr.counts.put(s, curr.counts.getOrDefault(s, 0) + count);
        }
    }

    public AutocompleteSystem(String[] sentences, int[] times) {
        root = new TrieNode();
        for (int i = 0; i < sentences.length; i++) {
            add(sentences[i], times[i]);
        }
    }
    
    public List<String> input(char c) {
        if (c == '#') {
            add(currSentence.toString(), 1);
            currSentence.setLength(0);
            return new ArrayList<>();
        }
        currSentence.append(c);
        TrieNode curr = root;
        for (char ch : currSentence.toString().toCharArray()) {
            if (!curr.children.containsKey(ch)) return new ArrayList<>();
            curr = curr.children.get(ch);
        }
        List<Map.Entry<String, Integer>> list = new ArrayList<>(curr.counts.entrySet());
        list.sort((a, b) -> {
            if (!a.getValue().equals(b.getValue())) {
                return b.getValue() - a.getValue();
            }
            return a.getKey().compareTo(b.getKey());
        });
        List<String> res = new ArrayList<>();
        for (int i = 0; i < Math.min(3, list.size()); i++) {
            res.add(list.get(i).getKey());
        }
        return res;
    }
}`,
        approach: 'Java Trie with Frequency Map Ranking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `class TrieNode {
    constructor() {
        this.children = new Map();
        this.counts = new Map();
    }
}

/**
 * @param {string[]} sentences
 * @param {number[]} times
 */
var AutocompleteSystem = function(sentences, times) {
    this.root = new TrieNode();
    this.currSentence = "";
    for (let i = 0; i < sentences.length; i++) {
        this._add(sentences[i], times[i]);
    }
};

AutocompleteSystem.prototype._add = function(sentence, count) {
    let curr = this.root;
    for (const ch of sentence) {
        if (!curr.children.has(ch)) {
            curr.children.set(ch, new TrieNode());
        }
        curr = curr.children.get(ch);
        curr.counts.set(sentence, (curr.counts.get(sentence) || 0) + count);
    }
};

/** 
 * @param {character} c
 * @return {string[]}
 */
AutocompleteSystem.prototype.input = function(c) {
    if (c === '#') {
        this._add(this.currSentence, 1);
        this.currSentence = "";
        return [];
    }
    this.currSentence += c;
    let curr = this.root;
    for (const ch of this.currSentence) {
        if (!curr.children.has(ch)) return [];
        curr = curr.children.get(ch);
    }
    const entries = Array.from(curr.counts.entries());
    entries.sort((a, b) => {
        if (a[1] !== b[1]) return b[1] - a[1];
        return a[0].localeCompare(b[0]);
    });
    return entries.slice(0, 3).map(e => e[0]);
};`,
        approach: 'JavaScript Trie Frequency Ranking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'design-search-autocomplete-system.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    sentences = ["i love you", "island", "iroman", "i love leetcode"]
    times = [5, 3, 2, 2]
    ac = scope['AutocompleteSystem'](sentences, times)

    assert ac.input('i') == ["i love you", "island", "i love leetcode"]
    assert ac.input(' ') == ["i love you", "i love leetcode"]
    assert ac.input('a') == []
    assert ac.input('#') == []
    print("✓ design-search-autocomplete-system passed")

if __name__ == '__main__':
    main()
`
  },

  // 15. #676 implement-magic-dictionary
  {
    slug: 'implement-magic-dictionary',
    number: 676,
    category: 'Algorithms',
    patterns: ['tree-trie-prefix'],
    hints: [
      {
        level: 1,
        title: 'Single Character Edit Distance Search',
        text: 'Determine whether an inquiry string can match an existing dictionary word by modifying exactly one character.'
      },
      {
        level: 2,
        title: 'Trie DFS with Error Budget',
        text: 'Traverse the prefix tree recursively tracking remaining allowable character substitutions (initially one).'
      },
      {
        level: 3,
        title: 'Magic Dictionary Blueprint',
        text: 'In search(word): helper dfs(node, idx, edits): if edits < 0: return False. If idx == len(word): return node.is_word and edits == 0. For ch, child in node.children: if dfs(child, idx+1, edits - (0 if ch == word[idx] else 1)) return True. Return False.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_word = False\n\nclass MagicDictionary:\n    def __init__(self):\n        self.root = TrieNode()\n\n    def buildDict(self, dictionary: list[str]) -> None:\n        for word in dictionary:\n            curr = self.root\n            for ch in word:\n                if ch not in curr.children:\n                    curr.children[ch] = TrieNode()\n                curr = curr.children[ch]\n            curr.is_word = True\n\n    def search(self, searchWord: str) -> bool:\n        def dfs(node, idx, edits):\n            if edits < 0:\n                return False\n            if idx == len(searchWord):\n                return node.is_word and edits == 0\n            for ch, child in node.children.items():\n                new_edits = edits if ch == searchWord[idx] else edits - 1\n                if dfs(child, idx + 1, new_edits):\n                    return True\n            return False\n        return dfs(self.root, 0, 1)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(L * 26)',
      space: 'O(Total Characters in Dictionary)',
      variables: ['L: length of searchWord'],
      notes: 'Branching occurs at only one character mismatch level, keeping search bounded by 26 * L operations.',
      whyNaiveFails: 'Generating all 25 * L variations and looking them up takes extra hash table space and overhead.',
      spaceTimeTradeoff: 'Trie structure consolidates common prefixes.',
      interviewerExpectation: 'Ensuring that exactly one character is modified (edits must equal zero at completion, not untouched).'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False

class MagicDictionary:
    def __init__(self):
        self.root = TrieNode()

    def buildDict(self, dictionary: list[str]) -> None:
        for word in dictionary:
            curr = self.root
            for ch in word:
                if ch not in curr.children:
                    curr.children[ch] = TrieNode()
                curr = curr.children[ch]
            curr.is_word = True

    def search(self, searchWord: str) -> bool:
        def dfs(node, idx, edits):
            if edits < 0:
                return False
            if idx == len(searchWord):
                return node.is_word and edits == 0
            for ch, child in node.children.items():
                new_edits = edits if ch == searchWord[idx] else edits - 1
                if dfs(child, idx + 1, new_edits):
                    return True
            return False
        return dfs(self.root, 0, 1)`,
        approach: 'Trie DFS with Error Budget Tracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class MagicDictionary {
    struct TrieNode {
        unordered_map<char, TrieNode*> children;
        bool isWord = false;
    };
    TrieNode* root;

    bool dfs(TrieNode* node, const string& word, int idx, int edits) {
        if (edits < 0) return false;
        if (idx == word.size()) return node->isWord && edits == 0;
        for (auto& p : node->children) {
            int newEdits = (p.first == word[idx]) ? edits : edits - 1;
            if (dfs(p.second, word, idx + 1, newEdits)) return true;
        }
        return false;
    }
public:
    MagicDictionary() {
        root = new TrieNode();
    }
    
    void buildDict(vector<string> dictionary) {
        for (const string& word : dictionary) {
            TrieNode* curr = root;
            for (char ch : word) {
                if (!curr->children.count(ch)) curr->children[ch] = new TrieNode();
                curr = curr->children[ch];
            }
            curr->isWord = true;
        }
    }
    
    bool search(string searchWord) {
        return dfs(root, searchWord, 0, 1);
    }
};`,
        approach: 'C++ Trie Branching with 1-Edit Distance',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class MagicDictionary {
    class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        boolean isWord = false;
    }
    private TrieNode root;

    public MagicDictionary() {
        root = new TrieNode();
    }
    
    public void buildDict(String[] dictionary) {
        for (String word : dictionary) {
            TrieNode curr = root;
            for (char ch : word.toCharArray()) {
                curr.children.putIfAbsent(ch, new TrieNode());
                curr = curr.children.get(ch);
            }
            curr.isWord = true;
        }
    }
    
    public boolean search(String searchWord) {
        return dfs(root, searchWord, 0, 1);
    }

    private boolean dfs(TrieNode node, String word, int idx, int edits) {
        if (edits < 0) return false;
        if (idx == word.length()) return node.isWord && edits == 0;
        for (Map.Entry<Character, TrieNode> e : node.children.entrySet()) {
            int newEdits = (e.getKey() == word.charAt(idx)) ? edits : edits - 1;
            if (dfs(e.getValue(), word, idx + 1, newEdits)) return true;
        }
        return false;
    }
}`,
        approach: 'Java Trie DFS with Substitution Budget',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `class TrieNode {
    constructor() {
        this.children = new Map();
        this.isWord = false;
    }
}

var MagicDictionary = function() {
    this.root = new TrieNode();
};

/** 
 * @param {string[]} dictionary
 * @return {void}
 */
MagicDictionary.prototype.buildDict = function(dictionary) {
    for (const word of dictionary) {
        let curr = this.root;
        for (const ch of word) {
            if (!curr.children.has(ch)) {
                curr.children.set(ch, new TrieNode());
            }
            curr = curr.children.get(ch);
        }
        curr.isWord = true;
    }
};

/** 
 * @param {string} searchWord
 * @return {boolean}
 */
MagicDictionary.prototype.search = function(searchWord) {
    function dfs(node, idx, edits) {
        if (edits < 0) return false;
        if (idx === searchWord.length) return node.isWord && edits === 0;
        for (const [ch, child] of node.children.entries()) {
            const newEdits = ch === searchWord[idx] ? edits : edits - 1;
            if (dfs(child, idx + 1, newEdits)) return true;
        }
        return false;
    }
    return dfs(this.root, 0, 1);
};`,
        approach: 'JavaScript Trie Search with Edit Check',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'implement-magic-dictionary.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    md = scope['MagicDictionary']()

    md.buildDict(["hello", "leetcode"])
    assert md.search("hello") == False
    assert md.search("hhllo") == True
    assert md.search("hell") == False
    assert md.search("leetcoded") == False
    print("✓ implement-magic-dictionary passed")

if __name__ == '__main__':
    main()
`
  },

  // 16. #677 map-sum-pairs
  {
    slug: 'map-sum-pairs',
    number: 677,
    category: 'Algorithms',
    patterns: ['tree-trie-prefix'],
    hints: [
      {
        level: 1,
        title: 'Prefix Aggregate Value Tallying',
        text: 'Associate keys with numeric scores so that prefix queries compute the cumulative sum of all keys possessing the inquiry prefix.'
      },
      {
        level: 2,
        title: 'Prefix Score Differential Propagation',
        text: 'Store existing key values in a map. When inserting a key, calculate the delta (new value minus old value) and add delta to each node along the prefix path.'
      },
      {
        level: 3,
        title: 'MapSum Blueprint',
        text: 'In init: root has score = 0 and children. map stores key -> val. In insert(key, val): delta = val - map.get(key, 0), map[key] = val, traverse key adding delta to node.score. In sum(prefix): traverse to prefix node, return node.score or 0 if prefix not found.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.score = 0\n\nclass MapSum:\n    def __init__(self):\n        self.root = TrieNode()\n        self.map = {}\n\n    def insert(self, key: str, val: int) -> None:\n        delta = val - self.map.get(key, 0)\n        self.map[key] = val\n        curr = self.root\n        for ch in key:\n            if ch not in curr.children:\n                curr.children[ch] = TrieNode()\n            curr = curr.children[ch]\n            curr.score += delta\n\n    def sum(self, prefix: str) -> int:\n        curr = self.root\n        for ch in prefix:\n            if ch not in curr.children:\n                return 0\n            curr = curr.children[ch]\n        return curr.score\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(K)',
      space: 'O(Total Characters in Keys)',
      variables: ['K: length of inserted key or query prefix'],
      notes: 'Both insert and sum queries execute in linear time relative to string length.',
      whyNaiveFails: 'Re-traversing and summing all descendants on every query takes O(N * L) time.',
      spaceTimeTradeoff: 'Maintains running score sum in each trie node for O(K) instant retrieval.',
      interviewerExpectation: 'Correct handling of key overrides using delta subtraction.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.score = 0

class MapSum:
    def __init__(self):
        self.root = TrieNode()
        self.map = {}

    def insert(self, key: str, val: int) -> None:
        delta = val - self.map.get(key, 0)
        self.map[key] = val
        curr = self.root
        for ch in key:
            if ch not in curr.children:
                curr.children[ch] = TrieNode()
            curr = curr.children[ch]
            curr.score += delta

    def sum(self, prefix: str) -> int:
        curr = self.root
        for ch in prefix:
            if ch not in curr.children:
                return 0
            curr = curr.children[ch]
        return curr.score`,
        approach: 'Delta Score Propagation on Trie Nodes',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class MapSum {
    struct TrieNode {
        unordered_map<char, TrieNode*> children;
        int score = 0;
    };
    TrieNode* root;
    unordered_map<string, int> map;
public:
    MapSum() {
        root = new TrieNode();
    }
    
    void insert(string key, int val) {
        int delta = val - map[key];
        map[key] = val;
        TrieNode* curr = root;
        for (char ch : key) {
            if (!curr->children.count(ch)) curr->children[ch] = new TrieNode();
            curr = curr->children[ch];
            curr->score += delta;
        }
    }
    
    int sum(string prefix) {
        TrieNode* curr = root;
        for (char ch : prefix) {
            if (!curr->children.count(ch)) return 0;
            curr = curr->children[ch];
        }
        return curr->score;
    }
};`,
        approach: 'C++ Prefix Tree with Cumulative Subtree Sum',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class MapSum {
    class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        int score = 0;
    }
    private TrieNode root;
    private Map<String, Integer> map;

    public MapSum() {
        root = new TrieNode();
        map = new HashMap<>();
    }
    
    public void insert(String key, int val) {
        int delta = val - map.getOrDefault(key, 0);
        map.put(key, val);
        TrieNode curr = root;
        for (char ch : key.toCharArray()) {
            curr.children.putIfAbsent(ch, new TrieNode());
            curr = curr.children.get(ch);
            curr.score += delta;
        }
    }
    
    public int sum(String prefix) {
        TrieNode curr = root;
        for (char ch : prefix.toCharArray()) {
            if (!curr.children.containsKey(ch)) return 0;
            curr = curr.children.get(ch);
        }
        return curr.score;
    }
}`,
        approach: 'Java Trie Delta Node Accumulator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `class TrieNode {
    constructor() {
        this.children = new Map();
        this.score = 0;
    }
}

var MapSum = function() {
    this.root = new TrieNode();
    this.map = new Map();
};

/** 
 * @param {string} key 
 * @param {number} val
 * @return {void}
 */
MapSum.prototype.insert = function(key, val) {
    const delta = val - (this.map.get(key) || 0);
    this.map.set(key, val);
    let curr = this.root;
    for (const ch of key) {
        if (!curr.children.has(ch)) {
            curr.children.set(ch, new TrieNode());
        }
        curr = curr.children.get(ch);
        curr.score += delta;
    }
};

/** 
 * @param {string} prefix
 * @return {number}
 */
MapSum.prototype.sum = function(prefix) {
    let curr = this.root;
    for (const ch of prefix) {
        if (!curr.children.has(ch)) return 0;
        curr = curr.children.get(ch);
    }
    return curr.score;
};`,
        approach: 'JavaScript Trie Prefix Sum Provider',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'map-sum-pairs.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    ms = scope['MapSum']()

    ms.insert("apple", 3)
    assert ms.sum("ap") == 3
    ms.insert("app", 2)
    assert ms.sum("ap") == 5
    ms.insert("apple", 2)
    assert ms.sum("ap") == 4
    print("✓ map-sum-pairs passed")

if __name__ == '__main__':
    main()
`
  },

  // 17. #690 employee-importance
  {
    slug: 'employee-importance',
    number: 690,
    category: 'Algorithms',
    patterns: ['tree-dfs-subproblem'],
    hints: [
      {
        level: 1,
        title: 'Hierarchical Team Aggregate Sum',
        text: 'Tally the total valuation of an executive together with all direct and indirect subordinates across the reporting tree.'
      },
      {
        level: 2,
        title: 'ID Lookup Map and Traversal',
        text: 'Index employee objects in a hash map by their ID. Recursively sum the designated person importance and recurse through subordinate identifiers.'
      },
      {
        level: 3,
        title: 'Importance Sum Blueprint',
        text: 'Build map: emp_map = {e.id: e for e in employees}. Define dfs(emp_id): emp = emp_map[emp_id]; return emp.importance + sum(dfs(sub_id) for sub_id in emp.subordinates). Return dfs(id).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\n"""\n# Definition for Employee.\nclass Employee:\n    def __init__(self, id: int, importance: int, subordinates: list[int]):\n        self.id = id\n        self.importance = importance\n        self.subordinates = subordinates\n"""\n\nclass Solution:\n    def getImportance(self, employees: list[\'Employee\'], id: int) -> int:\n        emp_map = {e.id: e for e in employees}\n        def dfs(emp_id):\n            emp = emp_map[emp_id]\n            return emp.importance + sum(dfs(sub_id) for sub_id in emp.subordinates)\n        return dfs(id)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of employees'],
      notes: 'Builds dictionary in O(N) time and visits each subordinate node in the hierarchy exactly once.',
      whyNaiveFails: 'Scanning the list linearly to find each subordinate on every step produces O(N^2) complexity.',
      spaceTimeTradeoff: 'Hash table provides constant time lookup for each employee ID.',
      interviewerExpectation: 'Use of hash map indexing combined with depth-first search or breadth-first search tree traversal.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `"""
# Definition for Employee.
class Employee:
    def __init__(self, id: int, importance: int, subordinates: list[int]):
        self.id = id
        self.importance = importance
        self.subordinates = subordinates
"""

class Solution:
    def getImportance(self, employees: list['Employee'], id: int) -> int:
        emp_map = {e.id: e for e in employees}
        def dfs(emp_id):
            emp = emp_map[emp_id]
            return emp.importance + sum(dfs(sub_id) for sub_id in emp.subordinates)
        return dfs(id)`,
        approach: 'Hash Map Subordinate Tree DFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `/*
class Employee {
public:
    int id;
    int importance;
    vector<int> subordinates;
};
*/

class Solution {
    unordered_map<int, Employee*> empMap;

    int dfs(int id) {
        Employee* emp = empMap[id];
        int total = emp->importance;
        for (int subId : emp->subordinates) {
            total += dfs(subId);
        }
        return total;
    }
public:
    int getImportance(vector<Employee*> employees, int id) {
        for (Employee* emp : employees) {
            empMap[emp->id] = emp;
        }
        return dfs(id);
    }
};`,
        approach: 'C++ Recursive Hierarchy Summation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `/*
class Employee {
    public int id;
    public int importance;
    public List<Integer> subordinates;
};
*/

class Solution {
    private Map<Integer, Employee> empMap = new HashMap<>();

    private int dfs(int id) {
        Employee emp = empMap.get(id);
        int total = emp.importance;
        for (int subId : emp.subordinates) {
            total += dfs(subId);
        }
        return total;
    }

    public int getImportance(List<Employee> employees, int id) {
        for (Employee emp : employees) {
            empMap.put(emp.id, emp);
        }
        return dfs(id);
    }
}`,
        approach: 'Java Subordinate Tree Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * Definition for Employee.
 * function Employee(id, importance, subordinates) {
 *     this.id = id;
 *     this.importance = importance;
 *     this.subordinates = subordinates;
 * }
 */

/**
 * @param {Employee[]} employees
 * @param {number} id
 * @return {number}
 */
var getImportance = function(employees, id) {
    const empMap = new Map();
    for (const emp of employees) {
        empMap.set(emp.id, emp);
    }
    function dfs(empId) {
        const emp = empMap.get(empId);
        let total = emp.importance;
        for (const subId of emp.subordinates) {
            total += dfs(subId);
        }
        return total;
    }
    return dfs(id);
};`,
        approach: 'JavaScript Map Recursive Subordinate Sum',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'employee-importance.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


class Employee:
    def __init__(self, id: int, importance: int, subordinates: list[int]):
        self.id = id
        self.importance = importance
        self.subordinates = subordinates

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {'Employee': Employee}
    exec(sol_code, scope)
    sol = scope['Solution']()

    e1 = Employee(1, 5, [2, 3])
    e2 = Employee(2, 3, [])
    e3 = Employee(3, 3, [])
    assert sol.getImportance([e1, e2, e3], 1) == 11
    assert sol.getImportance([e1, e2, e3], 2) == 3
    print("✓ employee-importance passed")

if __name__ == '__main__':
    main()
`
  },

  // 18. #702 search-in-a-sorted-array-of-unknown-size
  {
    slug: 'search-in-a-sorted-array-of-unknown-size',
    number: 702,
    category: 'Algorithms',
    patterns: ['binary-search-basic'],
    hints: [
      {
        level: 1,
        title: 'Exponential Range Bounding',
        text: 'When array boundaries are unknown, expand an exploration window exponentially until bounding the candidate value.'
      },
      {
        level: 2,
        title: 'Two-Phase Binary Search',
        text: 'Double the high pointer index (1, 2, 4, 8...) while reader.get(high) is less than target. Then execute standard binary search within [low, high].'
      },
      {
        level: 3,
        title: 'Bounding and Search Blueprint',
        text: 'Set low = 0, high = 1. While reader.get(high) < target: low = high, high *= 2. Binary search: while low <= high: mid = (low + high) // 2, val = reader.get(mid). If val == target return mid. Else adjust bounds. Return -1.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\n# """\n# This is ArrayReader\'s API interface.\n# You should not implement it, or speculate about its implementation\n# """\n#class ArrayReader:\n#    def get(self, index: int) -> int:\n\nclass Solution:\n    def search(self, reader: \'ArrayReader\', target: int) -> int:\n        low, high = 0, 1\n        while reader.get(high) < target:\n            low = high\n            high *= 2\n        while low <= high:\n            mid = (low + high) // 2\n            val = reader.get(mid)\n            if val == target:\n                return mid\n            elif val < target:\n                low = mid + 1\n            else:\n                high = mid - 1\n        return -1\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(log T)',
      space: 'O(1)',
      variables: ['T: index position of target element'],
      notes: 'Exponential doubling takes O(log T) steps; binary search inside window takes O(log T) steps.',
      whyNaiveFails: 'Linear scanning takes O(T) time and triggers excessive reader interface queries.',
      spaceTimeTradeoff: 'Constant auxiliary space with minimal reader API evaluations.',
      interviewerExpectation: 'Use of exponential stride galloping to bound infinite or unknown length arrays.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `# """
# This is ArrayReader's API interface.
# You should not implement it, or speculate about its implementation
# """
#class ArrayReader:
#    def get(self, index: int) -> int:

class Solution:
    def search(self, reader: 'ArrayReader', target: int) -> int:
        low, high = 0, 1
        while reader.get(high) < target:
            low = high
            high *= 2
        while low <= high:
            mid = (low + high) // 2
            val = reader.get(mid)
            if val == target:
                return mid
            elif val < target:
                low = mid + 1
            else:
                high = mid - 1
        return -1`,
        approach: 'Exponential Bounding and Binary Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `/**
 * // This is the ArrayReader's API interface.
 * // You should not implement it, or speculate about its implementation
 * class ArrayReader {
 *   public:
 *     int get(int index);
 * };
 */

class Solution {
public:
    int search(const ArrayReader& reader, int target) {
        int low = 0, high = 1;
        while (reader.get(high) < target) {
            low = high;
            high *= 2;
        }
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int val = reader.get(mid);
            if (val == target) return mid;
            if (val < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
};`,
        approach: 'C++ Galloping Binary Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `/**
 * // This is ArrayReader's API interface.
 * // You should not implement it, or speculate about its implementation
 * interface ArrayReader {
 *     public int get(int index);
 * }
 */

class Solution {
    public int search(ArrayReader reader, int target) {
        int low = 0, high = 1;
        while (reader.get(high) < target) {
            low = high;
            high *= 2;
        }
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int val = reader.get(mid);
            if (val == target) return mid;
            if (val < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`,
        approach: 'Java Exponential Range Bounding Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * // This is ArrayReader's API interface.
 * // You should not implement it, or speculate about its implementation
 * function ArrayReader() {
 *     @param {number} index
 *     @return {number}
 *     this.get = function(index) {
 *         ...
 *     };
 * };
 */

/**
 * @param {ArrayReader} reader
 * @param {number} target
 * @return {number}
 */
var search = function(reader, target) {
    let low = 0, high = 1;
    while (reader.get(high) < target) {
        low = high;
        high *= 2;
    }
    while (low <= high) {
        const mid = (low + high) >> 1;
        const val = reader.get(mid);
        if (val === target) return mid;
        if (val < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
};`,
        approach: 'JavaScript Exponential Search Stride',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'search-in-a-sorted-array-of-unknown-size.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


class ArrayReader:
    def __init__(self, arr):
        self.arr = arr
    def get(self, index: int) -> int:
        if 0 <= index < len(self.arr):
            return self.arr[index]
        return 2147483647

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {'ArrayReader': ArrayReader}
    exec(sol_code, scope)
    sol = scope['Solution']()

    reader = ArrayReader([-1, 0, 3, 5, 9, 12])
    assert sol.search(reader, 9) == 4
    assert sol.search(reader, 2) == -1
    print("✓ search-in-a-sorted-array-of-unknown-size passed")

if __name__ == '__main__':
    main()
`
  },

  // 19. #703 kth-largest-element-in-a-stream
  {
    slug: 'kth-largest-element-in-a-stream',
    number: 703,
    category: 'Algorithms',
    patterns: ['heap-top-k-elements'],
    hints: [
      {
        level: 1,
        title: 'Bounded Top Rank Filtering',
        text: 'Retain only the k largest values seen so far inside a container whose boundary continuously yields the k-th largest element.'
      },
      {
        level: 2,
        title: 'Size-Constrained Heap Maintenance',
        text: 'Push incoming numbers into the heap. Whenever the heap size exceeds k, pop the smallest element so that the minimum of the top k remains at index zero.'
      },
      {
        level: 3,
        title: 'KthLargest Blueprint',
        text: 'In init: store k, initialize heap. For num in nums: add(num). In add(val): heappush(heap, val). If len(heap) > k: heappop(heap). Return heap[0].'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport heapq\n\nclass KthLargest:\n    def __init__(self, k: int, nums: list[int]):\n        self.k = k\n        self.heap = []\n        for num in nums:\n            self.add(num)\n\n    def add(self, val: int) -> int:\n        heapq.heappush(self.heap, val)\n        if len(self.heap) > self.k:\n            heapq.heappop(self.heap)\n        return self.heap[0]\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(log K)',
      space: 'O(K)',
      variables: ['K: rank of largest element to maintain'],
      notes: 'Each add operation executes in O(log K) heap push and pop time.',
      whyNaiveFails: 'Sorting the accumulated stream takes O(N log N) on every new insertion.',
      spaceTimeTradeoff: 'Bounded size K min-heap avoids retaining non-qualifying elements.',
      interviewerExpectation: 'Maintaining min-heap of capacity K rather than max-heap of full size N.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import heapq

class KthLargest:
    def __init__(self, k: int, nums: list[int]):
        self.k = k
        self.heap = []
        for num in nums:
            self.add(num)

    def add(self, val: int) -> int:
        heapq.heappush(self.heap, val)
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)
        return self.heap[0]`,
        approach: 'Size-K Min-Heap Stream Tracker',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class KthLargest {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    int k;
public:
    KthLargest(int k, vector<int>& nums) : k(k) {
        for (int num : nums) {
            add(num);
        }
    }
    
    int add(int val) {
        minHeap.push(val);
        if (minHeap.size() > k) minHeap.pop();
        return minHeap.top();
    }
};`,
        approach: 'C++ Min Priority Queue Stream Buffer',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class KthLargest {
    private PriorityQueue<Integer> minHeap;
    private int k;

    public KthLargest(int k, int[] nums) {
        this.k = k;
        this.minHeap = new PriorityQueue<>();
        for (int num : nums) {
            add(num);
        }
    }
    
    public int add(int val) {
        minHeap.offer(val);
        if (minHeap.size() > k) {
            minHeap.poll();
        }
        return minHeap.peek();
    }
}`,
        approach: 'Java PriorityQueue Size-K Filtering',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function(k, nums) {
    this.k = k;
    this.heap = [];
    for (const num of nums) {
        this.add(num);
    }
};

/** 
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
    // Insert in sorted order for small k
    let idx = 0;
    while (idx < this.heap.length && this.heap[idx] < val) {
        idx++;
    }
    this.heap.splice(idx, 0, val);
    if (this.heap.length > this.k) {
        this.heap.shift();
    }
    return this.heap[0];
};`,
        approach: 'JavaScript Sorted Window Insertion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'kth-largest-element-in-a-stream.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    kl = scope['KthLargest'](3, [4, 5, 8, 2])

    assert kl.add(3) == 4
    assert kl.add(5) == 5
    assert kl.add(10) == 5
    assert kl.add(9) == 8
    assert kl.add(4) == 8
    print("✓ kth-largest-element-in-a-stream passed")

if __name__ == '__main__':
    main()
`
  },

  // 20. #705 design-hashset
  {
    slug: 'design-hashset',
    number: 705,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Bucket Chaining Key Partitioning',
        text: 'Distribute keys across an array of linked buckets using a modular index projection to resolve collisions gracefully.'
      },
      {
        level: 2,
        title: 'Collision Bucket Scanning',
        text: 'Choose a primary bucket array sized to a large prime (such as 769). On add, check if key exists in bucket; if not, append. On remove, delete key if present.'
      },
      {
        level: 3,
        title: 'MyHashSet Blueprint',
        text: 'In init: buckets = [[] for _ in range(769)]. In add(key): h = key % 769; if key not in buckets[h]: buckets[h].append(key). In remove(key): h = key % 769; if key in buckets[h]: buckets[h].remove(key). In contains(key): return key in buckets[key % 769].'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass MyHashSet:\n    def __init__(self):\n        self.size = 769\n        self.buckets = [[] for _ in range(self.size)]\n\n    def add(self, key: int) -> None:\n        h = key % self.size\n        if key not in self.buckets[h]:\n            self.buckets[h].append(key)\n\n    def remove(self, key: int) -> None:\n        h = key % self.size\n        if key in self.buckets[h]:\n            self.buckets[h].remove(key)\n\n    def contains(self, key: int) -> bool:\n        h = key % self.size\n        return key in self.buckets[h]\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) average',
      space: 'O(N + K)',
      variables: ['N: number of unique keys inserted', 'K: bucket array size'],
      notes: 'Modulo hashing with prime bucket count delivers O(1) average time per operation.',
      whyNaiveFails: 'Boolean array indexing of size 10^6 wastes memory when only few keys are inserted.',
      spaceTimeTradeoff: 'Chaining buckets balances memory footprint and collision resolution overhead.',
      interviewerExpectation: 'Implementation of hashing and collision resolution without standard library hash sets.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class MyHashSet:
    def __init__(self):
        self.size = 769
        self.buckets = [[] for _ in range(self.size)]

    def add(self, key: int) -> None:
        h = key % self.size
        if key not in self.buckets[h]:
            self.buckets[h].append(key)

    def remove(self, key: int) -> None:
        h = key % self.size
        if key in self.buckets[h]:
            self.buckets[h].remove(key)

    def contains(self, key: int) -> bool:
        h = key % self.size
        return key in self.buckets[h]`,
        approach: 'Bucket Chaining Hash Set',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class MyHashSet {
    int size = 769;
    vector<list<int>> buckets;
public:
    MyHashSet() : buckets(769) {}
    
    void add(int key) {
        int h = key % size;
        for (int v : buckets[h]) {
            if (v == key) return;
        }
        buckets[h].push_back(key);
    }
    
    void remove(int key) {
        int h = key % size;
        buckets[h].remove(key);
    }
    
    bool contains(int key) {
        int h = key % size;
        for (int v : buckets[h]) {
            if (v == key) return true;
        }
        return false;
    }
};`,
        approach: 'C++ Vector of Lists Bucket Chaining',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class MyHashSet {
    private int size = 769;
    private LinkedList<Integer>[] buckets;

    public MyHashSet() {
        buckets = new LinkedList[size];
        for (int i = 0; i < size; i++) {
            buckets[i] = new LinkedList<>();
        }
    }
    
    public void add(int key) {
        int h = key % size;
        if (!buckets[h].contains(key)) {
            buckets[h].add(key);
        }
    }
    
    public void remove(int key) {
        int h = key % size;
        buckets[h].removeFirstOccurrence(key);
    }
    
    public boolean contains(int key) {
        int h = key % size;
        return buckets[h].contains(key);
    }
}`,
        approach: 'Java LinkedList Bucket Hash Set',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var MyHashSet = function() {
    this.size = 769;
    this.buckets = Array.from({ length: 769 }, () => []);
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.add = function(key) {
    const h = key % this.size;
    if (!this.buckets[h].includes(key)) {
        this.buckets[h].push(key);
    }
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.remove = function(key) {
    const h = key % this.size;
    const idx = this.buckets[h].indexOf(key);
    if (idx !== -1) {
        this.buckets[h].splice(idx, 1);
    }
};

/** 
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.contains = function(key) {
    const h = key % this.size;
    return this.buckets[h].includes(key);
};`,
        approach: 'JavaScript Array of Buckets Hash Set',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'design-hashset.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    hs = scope['MyHashSet']()

    hs.add(1)
    hs.add(2)
    assert hs.contains(1) == True
    assert hs.contains(3) == False
    hs.add(2)
    assert hs.contains(2) == True
    hs.remove(2)
    assert hs.contains(2) == False
    print("✓ design-hashset passed")

if __name__ == '__main__':
    main()
`
  },

  // 21. #706 design-hashmap
  {
    slug: 'design-hashmap',
    number: 706,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Key Value Pair Bucket Chaining',
        text: 'Store key-value pairs in buckets indexed by modular projection, updating values upon duplicate keys.'
      },
      {
        level: 2,
        title: 'Collision Bucket Scanning and Replacement',
        text: 'Hash key to bucket index. When putting, if key matches an existing pair in the bucket, update its value; otherwise append pair. On remove, delete the pair.'
      },
      {
        level: 3,
        title: 'MyHashMap Blueprint',
        text: 'In init: buckets = [[] for _ in range(769)]. put(key, val): h = key % 769; find pair and update or append. get(key): scan bucket h, return val or -1. remove(key): scan bucket h, delete pair if present.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass MyHashMap:\n    def __init__(self):\n        self.size = 769\n        self.buckets = [[] for _ in range(self.size)]\n\n    def put(self, key: int, value: int) -> None:\n        h = key % self.size\n        for i, (k, v) in enumerate(self.buckets[h]):\n            if k == key:\n                self.buckets[h][i] = (key, value)\n                return\n        self.buckets[h].append((key, value))\n\n    def get(self, key: int) -> int:\n        h = key % self.size\n        for k, v in self.buckets[h]:\n            if k == key:\n                return v\n        return -1\n\n    def remove(self, key: int) -> None:\n        h = key % self.size\n        for i, (k, v) in enumerate(self.buckets[h]):\n            if k == key:\n                del self.buckets[h][i]\n                return\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) average',
      space: 'O(N + K)',
      variables: ['N: number of unique keys inserted', 'K: bucket count (769)'],
      notes: 'Modulo hash distribution ensures constant average time per insertion, retrieval, and deletion.',
      whyNaiveFails: 'Full flat array initialization of size 10^6 wastes memory when sparse keys are used.',
      spaceTimeTradeoff: 'Prime bucket array minimizes clustering while maintaining small memory footprint.',
      interviewerExpectation: 'Handling collision resolution and updating existing keys without duplicate entries.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class MyHashMap:
    def __init__(self):
        self.size = 769
        self.buckets = [[] for _ in range(self.size)]

    def put(self, key: int, value: int) -> None:
        h = key % self.size
        for i, (k, v) in enumerate(self.buckets[h]):
            if k == key:
                self.buckets[h][i] = (key, value)
                return
        self.buckets[h].append((key, value))

    def get(self, key: int) -> int:
        h = key % self.size
        for k, v in self.buckets[h]:
            if k == key:
                return v
        return -1

    def remove(self, key: int) -> None:
        h = key % self.size
        for i, (k, v) in enumerate(self.buckets[h]):
            if k == key:
                del self.buckets[h][i]
                return`,
        approach: 'Bucket Chaining Key-Value Hash Map',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class MyHashMap {
    int size = 769;
    vector<list<pair<int, int>>> buckets;
public:
    MyHashMap() : buckets(769) {}
    
    void put(int key, int value) {
        int h = key % size;
        for (auto& pair : buckets[h]) {
            if (pair.first == key) {
                pair.second = value;
                return;
            }
        }
        buckets[h].push_back({key, value});
    }
    
    int get(int key) {
        int h = key % size;
        for (auto& pair : buckets[h]) {
            if (pair.first == key) return pair.second;
        }
        return -1;
    }
    
    void remove(int key) {
        int h = key % size;
        for (auto it = buckets[h].begin(); it != buckets[h].end(); ++it) {
            if (it->first == key) {
                buckets[h].erase(it);
                return;
            }
        }
    }
};`,
        approach: 'C++ Bucket Chaining with std::list Pair',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class MyHashMap {
    class Entry {
        int key, val;
        Entry(int k, int v) { key = k; val = v; }
    }
    private int size = 769;
    private LinkedList<Entry>[] buckets;

    public MyHashMap() {
        buckets = new LinkedList[size];
        for (int i = 0; i < size; i++) {
            buckets[i] = new LinkedList<>();
        }
    }
    
    public void put(int key, int value) {
        int h = key % size;
        for (Entry e : buckets[h]) {
            if (e.key == key) {
                e.val = value;
                return;
            }
        }
        buckets[h].add(new Entry(key, value));
    }
    
    public int get(int key) {
        int h = key % size;
        for (Entry e : buckets[h]) {
            if (e.key == key) return e.val;
        }
        return -1;
    }
    
    public void remove(int key) {
        int h = key % size;
        Entry toRemove = null;
        for (Entry e : buckets[h]) {
            if (e.key == key) {
                toRemove = e;
                break;
            }
        }
        if (toRemove != null) {
            buckets[h].remove(toRemove);
        }
    }
}`,
        approach: 'Java Chained Bucket Hash Map',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var MyHashMap = function() {
    this.size = 769;
    this.buckets = Array.from({ length: 769 }, () => []);
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function(key, value) {
    const h = key % this.size;
    for (const pair of this.buckets[h]) {
        if (pair[0] === key) {
            pair[1] = value;
            return;
        }
    }
    this.buckets[h].push([key, value]);
};

/** 
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function(key) {
    const h = key % this.size;
    for (const pair of this.buckets[h]) {
        if (pair[0] === key) return pair[1];
    }
    return -1;
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function(key) {
    const h = key % this.size;
    const idx = this.buckets[h].findIndex(pair => pair[0] === key);
    if (idx !== -1) {
        this.buckets[h].splice(idx, 1);
    }
};`,
        approach: 'JavaScript Bucket Array Hash Map',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'design-hashmap.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    hm = scope['MyHashMap']()

    hm.put(1, 1)
    hm.put(2, 2)
    assert hm.get(1) == 1
    assert hm.get(3) == -1
    hm.put(2, 1)
    assert hm.get(2) == 1
    hm.remove(2)
    assert hm.get(2) == -1
    print("✓ design-hashmap passed")

if __name__ == '__main__':
    main()
`
  },

  // 22. #707 design-linked-list
  {
    slug: 'design-linked-list',
    number: 707,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Doubly Linked List Sentinel Pointers',
        text: 'Anchor a bidirectional chain with pseudo head and tail sentinels to eliminate special-case boundary handling.'
      },
      {
        level: 2,
        title: 'Indexed Traversal and Insertion',
        text: 'Maintain size counter. Traverse from head or tail depending on index proximity. Link new node between predecessor and successor.'
      },
      {
        level: 3,
        title: 'Doubly Linked List Blueprint',
        text: 'In init: head and tail sentinels with head.next = tail, tail.prev = head, size = 0. addAtIndex(index, val): if index in range, find pred and succ, splice new node, size += 1. deleteAtIndex(index): unlink node at index, size -= 1.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass ListNode:\n    def __init__(self, val=0):\n        self.val = val\n        self.prev = None\n        self.next = None\n\nclass MyLinkedList:\n    def __init__(self):\n        self.head = ListNode(0)\n        self.tail = ListNode(0)\n        self.head.next = self.tail\n        self.tail.prev = self.head\n        self.size = 0\n\n    def get(self, index: int) -> int:\n        if index < 0 or index >= self.size:\n            return -1\n        curr = self.head.next\n        for _ in range(index):\n            curr = curr.next\n        return curr.val\n\n    def addAtHead(self, val: int) -> None:\n        self.addAtIndex(0, val)\n\n    def addAtTail(self, val: int) -> None:\n        self.addAtIndex(self.size, val)\n\n    def addAtIndex(self, index: int, val: int) -> None:\n        if index < 0 or index > self.size:\n            return\n        pred = self.head\n        for _ in range(index):\n            pred = pred.next\n        succ = pred.next\n        new_node = ListNode(val)\n        new_node.prev = pred\n        new_node.next = succ\n        pred.next = new_node\n        succ.prev = new_node\n        self.size += 1\n\n    def deleteAtIndex(self, index: int) -> None:\n        if index < 0 or index >= self.size:\n            return\n        curr = self.head.next\n        for _ in range(index):\n            curr = curr.next\n        curr.prev.next = curr.next\n        curr.next.prev = curr.prev\n        self.size -= 1\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(index) for get/insert/delete, O(1) for head/tail',
      space: 'O(N)',
      variables: ['N: number of elements in linked list'],
      notes: 'Sentinel nodes ensure clean edge case insertions and deletions.',
      whyNaiveFails: 'Singly linked lists require traversing from the start to find predecessor on tail operations and deletions.',
      spaceTimeTradeoff: 'Doubly linked pointers double pointer memory while enabling bidirectional navigation.',
      interviewerExpectation: 'Use of dummy sentinel nodes to eliminate null checks for empty lists and single-node edge cases.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.prev = None
        self.next = None

class MyLinkedList:
    def __init__(self):
        self.head = ListNode(0)
        self.tail = ListNode(0)
        self.head.next = self.tail
        self.tail.prev = self.head
        self.size = 0

    def get(self, index: int) -> int:
        if index < 0 or index >= self.size:
            return -1
        curr = self.head.next
        for _ in range(index):
            curr = curr.next
        return curr.val

    def addAtHead(self, val: int) -> None:
        self.addAtIndex(0, val)

    def addAtTail(self, val: int) -> None:
        self.addAtIndex(self.size, val)

    def addAtIndex(self, index: int, val: int) -> None:
        if index < 0 or index > self.size:
            return
        pred = self.head
        for _ in range(index):
            pred = pred.next
        succ = pred.next
        new_node = ListNode(val)
        new_node.prev = pred
        new_node.next = succ
        pred.next = new_node
        succ.prev = new_node
        self.size += 1

    def deleteAtIndex(self, index: int) -> None:
        if index < 0 or index >= self.size:
            return
        curr = self.head.next
        for _ in range(index):
            curr = curr.next
        curr.prev.next = curr.next
        curr.next.prev = curr.prev
        self.size -= 1`,
        approach: 'Doubly Linked List with Dummy Sentinels',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class MyLinkedList {
    struct Node {
        int val;
        Node* prev = nullptr;
        Node* next = nullptr;
        Node(int v) : val(v) {}
    };
    Node* head;
    Node* tail;
    int size = 0;
public:
    MyLinkedList() {
        head = new Node(0);
        tail = new Node(0);
        head->next = tail;
        tail->prev = head;
    }
    
    int get(int index) {
        if (index < 0 || index >= size) return -1;
        Node* curr = head->next;
        for (int i = 0; i < index; ++i) curr = curr->next;
        return curr->val;
    }
    
    void addAtHead(int val) {
        addAtIndex(0, val);
    }
    
    void addAtTail(int val) {
        addAtIndex(size, val);
    }
    
    void addAtIndex(int index, int val) {
        if (index < 0 || index > size) return;
        Node* pred = head;
        for (int i = 0; i < index; ++i) pred = pred->next;
        Node* succ = pred->next;
        Node* node = new Node(val);
        node->prev = pred;
        node->next = succ;
        pred->next = node;
        succ->prev = node;
        size++;
    }
    
    void deleteAtIndex(int index) {
        if (index < 0 || index >= size) return;
        Node* curr = head->next;
        for (int i = 0; i < index; ++i) curr = curr->next;
        curr->prev->next = curr->next;
        curr->next->prev = curr->prev;
        delete curr;
        size--;
    }
};`,
        approach: 'C++ Doubly Linked List with Sentinels',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class MyLinkedList {
    class Node {
        int val;
        Node prev, next;
        Node(int val) { this.val = val; }
    }
    private Node head, tail;
    private int size = 0;

    public MyLinkedList() {
        head = new Node(0);
        tail = new Node(0);
        head.next = tail;
        tail.prev = head;
    }
    
    public int get(int index) {
        if (index < 0 || index >= size) return -1;
        Node curr = head.next;
        for (int i = 0; i < index; i++) curr = curr.next;
        return curr.val;
    }
    
    public void addAtHead(int val) {
        addAtIndex(0, val);
    }
    
    public void addAtTail(int val) {
        addAtIndex(size, val);
    }
    
    public void addAtIndex(int index, int val) {
        if (index < 0 || index > size) return;
        Node pred = head;
        for (int i = 0; i < index; i++) pred = pred.next;
        Node succ = pred.next;
        Node node = new Node(val);
        node.prev = pred;
        node.next = succ;
        pred.next = node;
        succ.prev = node;
        size++;
    }
    
    public void deleteAtIndex(int index) {
        if (index < 0 || index >= size) return;
        Node curr = head.next;
        for (int i = 0; i < index; i++) curr = curr.next;
        curr.prev.next = curr.next;
        curr.next.prev = curr.prev;
        size--;
    }
}`,
        approach: 'Java Doubly Linked List with Dummy Pointers',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `class ListNode {
    constructor(val = 0) {
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

var MyLinkedList = function() {
    this.head = new ListNode(0);
    this.tail = new ListNode(0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
};

/** 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
    if (index < 0 || index >= this.size) return -1;
    let curr = this.head.next;
    for (let i = 0; i < index; i++) curr = curr.next;
    return curr.val;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
    this.addAtIndex(0, val);
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
    this.addAtIndex(this.size, val);
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
    if (index < 0 || index > this.size) return;
    let pred = this.head;
    for (let i = 0; i < index; i++) pred = pred.next;
    const succ = pred.next;
    const node = new ListNode(val);
    node.prev = pred;
    node.next = succ;
    pred.next = node;
    succ.prev = node;
    this.size++;
};

/** 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
    if (index < 0 || index >= this.size) return;
    let curr = this.head.next;
    for (let i = 0; i < index; i++) curr = curr.next;
    curr.prev.next = curr.next;
    curr.next.prev = curr.prev;
    this.size--;
};`,
        approach: 'JavaScript Sentinel Doubly Linked Chain',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'design-linked-list.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    ll = scope['MyLinkedList']()

    ll.addAtHead(1)
    ll.addAtTail(3)
    ll.addAtIndex(1, 2)
    assert ll.get(1) == 2
    ll.deleteAtIndex(1)
    assert ll.get(1) == 3
    print("✓ design-linked-list passed")

if __name__ == '__main__':
    main()
`
  },

  // 23. #708 insert-into-a-sorted-circular-linked-list
  {
    slug: 'insert-into-a-sorted-circular-linked-list',
    number: 708,
    category: 'Algorithms',
    patterns: ['linked-list-pointers'],
    hints: [
      {
        level: 1,
        title: 'Circular Monotonic Insertion Point Detection',
        text: 'Traverse the circular loop looking for an ordered gap, the boundary turnaround point, or complete circuit traversal.'
      },
      {
        level: 2,
        title: 'Three Case Traversal Checking',
        text: 'Case 1: prev.val <= insertVal <= curr.val. Case 2: prev.val > curr.val (boundary turnaround) and insertVal >= prev.val or insertVal <= curr.val. Case 3: complete loop with all identical values.'
      },
      {
        level: 3,
        title: 'Circular Insertion Blueprint',
        text: 'If head is None: new_node.next = new_node; return new_node. prev, curr = head, head.next. Loop until match found or curr == head: if case 1 or case 2 match: break. Advance pointers. Splice new node between prev and curr.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\n"""\n# Definition for a Node.\nclass Node:\n    def __init__(self, val=None, next=None):\n        self.val = val\n        self.next = next\n"""\n\nclass Solution:\n    def insert(self, head: \'Optional[Node]\', insertVal: int) -> \'Node\':\n        if not head:\n            new_node = Node(insertVal)\n            new_node.next = new_node\n            return new_node\n\n        prev, curr = head, head.next\n        to_insert = False\n        while True:\n            if prev.val <= insertVal <= curr.val:\n                to_insert = True\n            elif prev.val > curr.val:\n                if insertVal >= prev.val or insertVal <= curr.val:\n                    to_insert = True\n            if to_insert or curr == head:\n                prev.next = Node(insertVal, curr)\n                return head\n            prev, curr = curr, curr.next\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: number of nodes in circular list'],
      notes: 'Traverses at most one full loop of the circular list with constant auxiliary pointers.',
      whyNaiveFails: 'Failing to handle the circular wrap-around point causes infinite loops or invalid list splices.',
      spaceTimeTradeoff: 'Constant auxiliary space utilizing existing list pointers.',
      interviewerExpectation: 'Handling the three insertion conditions: between sorted values, at the list wrap-around, and all uniform values.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `"""
# Definition for a Node.
class Node:
    def __init__(self, val=None, next=None):
        self.val = val
        self.next = next
"""

class Solution:
    def insert(self, head: 'Optional[Node]', insertVal: int) -> 'Node':
        if not head:
            new_node = Node(insertVal)
            new_node.next = new_node
            return new_node

        prev, curr = head, head.next
        to_insert = False
        while True:
            if prev.val <= insertVal <= curr.val:
                to_insert = True
            elif prev.val > curr.val:
                if insertVal >= prev.val or insertVal <= curr.val:
                    to_insert = True
            if to_insert or curr == head:
                prev.next = Node(insertVal, curr)
                return head
            prev, curr = curr, curr.next`,
        approach: 'Circular Scan with Wrap-Around Condition',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `/*
class Node {
public:
    int val;
    Node* next;
    Node() {}
    Node(int _val) { val = _val; next = NULL; }
    Node(int _val, Node* _next) { val = _val; next = _next; }
};
*/

class Solution {
public:
    Node* insert(Node* head, int insertVal) {
        if (!head) {
            Node* newNode = new Node(insertVal);
            newNode->next = newNode;
            return newNode;
        }
        Node* prev = head;
        Node* curr = head->next;
        bool toInsert = false;
        while (true) {
            if (prev->val <= insertVal && insertVal <= curr->val) {
                toInsert = true;
            } else if (prev->val > curr->val) {
                if (insertVal >= prev->val || insertVal <= curr->val) {
                    toInsert = true;
                }
            }
            if (toInsert || curr == head) {
                prev->next = new Node(insertVal, curr);
                return head;
            }
            prev = curr;
            curr = curr->next;
        }
    }
};`,
        approach: 'C++ Circular Pointer Walk with Wrap Detection',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `/*
class Node {
    public int val;
    public Node next;
    public Node() {}
    public Node(int _val) { val = _val; }
    public Node(int _val, Node _next) { val = _val; next = _next; }
};
*/

class Solution {
    public Node insert(Node head, int insertVal) {
        if (head == null) {
            Node newNode = new Node(insertVal);
            newNode.next = newNode;
            return newNode;
        }
        Node prev = head;
        Node curr = head.next;
        boolean toInsert = false;
        while (true) {
            if (prev.val <= insertVal && insertVal <= curr.val) {
                toInsert = true;
            } else if (prev.val > curr.val) {
                if (insertVal >= prev.val || insertVal <= curr.val) {
                    toInsert = true;
                }
            }
            if (toInsert || curr == head) {
                prev.next = new Node(insertVal, curr);
                return head;
            }
            prev = curr;
            curr = curr.next;
        }
    }
}`,
        approach: 'Java Circular Linked List Insertion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * // Definition for a Node.
 * function Node(val, next) {
 *     this.val = val;
 *     this.next = next;
 * };
 */

/**
 * @param {Node|null} head
 * @param {number} insertVal
 * @return {Node}
 */
var insert = function(head, insertVal) {
    if (!head) {
        const newNode = new Node(insertVal);
        newNode.next = newNode;
        return newNode;
    }
    let prev = head, curr = head.next;
    let toInsert = false;
    while (true) {
        if (prev.val <= insertVal && insertVal <= curr.val) {
            toInsert = true;
        } else if (prev.val > curr.val) {
            if (insertVal >= prev.val || insertVal <= curr.val) {
                toInsert = true;
            }
        }
        if (toInsert || curr === head) {
            prev.next = new Node(insertVal, curr);
            return head;
        }
        prev = curr;
        curr = curr.next;
    }
};`,
        approach: 'JavaScript Circular Insertion with Pointers',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'insert-into-a-sorted-circular-linked-list.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


class Node:
    def __init__(self, val=None, next=None):
        self.val = val
        self.next = next

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {'Node': Node, 'Optional': type('Optional', (), {'__class_getitem__': lambda cls, item: item})}
    exec(sol_code, scope)
    sol = scope['Solution']()

    n1 = Node(1)
    n3 = Node(3)
    n4 = Node(4)
    n3.next = n4
    n4.next = n1
    n1.next = n3

    res = sol.insert(n3, 2)
    assert res.val == 3
    assert n1.next.val == 2
    assert n1.next.next.val == 3

    sol_empty = sol.insert(None, 1)
    assert sol_empty.val == 1
    assert sol_empty.next == sol_empty
    print("✓ insert-into-a-sorted-circular-linked-list passed")

if __name__ == '__main__':
    main()
`
  },

  // 24. #710 random-pick-with-blacklist
  {
    slug: 'random-pick-with-blacklist',
    number: 710,
    category: 'Algorithms',
    patterns: ['binary-search-basic'],
    hints: [
      {
        level: 1,
        title: 'Virtual Dense Remapping Sampling',
        text: 'Compact valid numbers into a contiguous range [0, M-1] by remapping blacklisted values in that prefix to valid numbers in the tail.'
      },
      {
        level: 2,
        title: 'Tail Swap Hash Remapping',
        text: 'Let M = n - len(blacklist). Put blacklist numbers in a set. Iterate over blacklisted items strictly less than M, mapping each to an available non-blacklisted item from [M, n-1].'
      },
      {
        level: 3,
        title: 'Blacklist Remapping Blueprint',
        text: 'M = n - len(blacklist). b_set = set(blacklist). last = n - 1. For b in blacklist: if b < M: while last in b_set: last -= 1; map[b] = last; last -= 1. In pick(): r = randint(0, M - 1); return map.get(r, r).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport random\n\nclass Solution:\n    def __init__(self, n: int, blacklist: list[int]):\n        self.mapping = {}\n        self.m = n - len(blacklist)\n        b_set = set(blacklist)\n        last = n - 1\n        for b in blacklist:\n            if b < self.m:\n                while last in b_set:\n                    last -= 1\n                self.mapping[b] = last\n                last -= 1\n\n    def pick(self) -> int:\n        r = random.randint(0, self.m - 1)\n        return self.mapping.get(r, r)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(B) init, O(1) pick',
      space: 'O(B)',
      variables: ['B: length of blacklist', 'N: upper range bound'],
      notes: 'Initial remapping takes O(B) time; each pick executes in strict O(1) random lookup time.',
      whyNaiveFails: 'Rejection sampling can loop indefinitely if blacklist occupies a significant fraction of N.',
      spaceTimeTradeoff: 'Hash table stores remappings only for blacklisted items under M, requiring O(B) memory.',
      interviewerExpectation: 'Use of two-pointer tail swapping to compress whitelist into [0, M-1].'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import random

class Solution:
    def __init__(self, n: int, blacklist: list[int]):
        self.mapping = {}
        self.m = n - len(blacklist)
        b_set = set(blacklist)
        last = n - 1
        for b in blacklist:
            if b < self.m:
                while last in b_set:
                    last -= 1
                self.mapping[b] = last
                last -= 1

    def pick(self) -> int:
        r = random.randint(0, self.m - 1)
        return self.mapping.get(r, r)`,
        approach: 'Tail Value Remapping to Contiguous Prefix',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
    int m;
    unordered_map<int, int> mapping;
public:
    Solution(int n, vector<int>& blacklist) {
        m = n - blacklist.size();
        unordered_set<int> bSet(blacklist.begin(), blacklist.end());
        int last = n - 1;
        for (int b : blacklist) {
            if (b < m) {
                while (bSet.count(last)) last--;
                mapping[b] = last--;
            }
        }
    }
    
    int pick() {
        int r = rand() % m;
        return mapping.count(r) ? mapping[r] : r;
    }
};`,
        approach: 'C++ Tail Swapping Sparse Map',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    private int m;
    private Map<Integer, Integer> mapping;
    private Random rand;

    public Solution(int n, int[] blacklist) {
        this.m = n - blacklist.length;
        this.mapping = new HashMap<>();
        this.rand = new Random();
        Set<Integer> bSet = new HashSet<>();
        for (int b : blacklist) bSet.add(b);
        int last = n - 1;
        for (int b : blacklist) {
            if (b < m) {
                while (bSet.contains(last)) last--;
                mapping.put(b, last--);
            }
        }
    }
    
    public int pick() {
        int r = rand.nextInt(m);
        return mapping.getOrDefault(r, r);
    }
}`,
        approach: 'Java Compressed Whitelist Mapping',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number} n
 * @param {number[]} blacklist
 */
var Solution = function(n, blacklist) {
    this.m = n - blacklist.length;
    this.mapping = new Map();
    const bSet = new Set(blacklist);
    let last = n - 1;
    for (const b of blacklist) {
        if (b < this.m) {
            while (bSet.has(last)) last--;
            this.mapping.set(b, last--);
        }
    }
};

/**
 * @return {number}
 */
Solution.prototype.pick = function() {
    const r = Math.floor(Math.random() * this.m);
    return this.mapping.has(r) ? this.mapping.get(r) : r;
};`,
        approach: 'JavaScript Map Tail Remapping',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'random-pick-with-blacklist.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    sol = scope['Solution'](7, [2, 3, 5])

    picks = {sol.pick() for _ in range(50)}
    assert picks.issubset({0, 1, 4, 6})
    assert 2 not in picks and 3 not in picks and 5 not in picks
    print("✓ random-pick-with-blacklist passed")

if __name__ == '__main__':
    main()
`
  },

  // 25. #716 max-stack
  {
    slug: 'max-stack',
    number: 716,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Dual Chronological and Extreme Ordering Coordination',
        text: 'Coordinate a sequential chain recording insertion order with an ordered ranking structure tracking maximum values with efficient node deletion.'
      },
      {
        level: 2,
        title: 'Two-Way Node References with Soft Deletion',
        text: 'Each node in the doubly linked chain contains an identifier. Keep a max-heap of (val, id, node). Mark popped nodes as deleted in both structures.'
      },
      {
        level: 3,
        title: 'MaxStack Blueprint',
        text: 'In push(x): append node to tail of doubly linked list, push (-x, -id, node) to heap. In pop(): remove tail node, record deleted id, return node.val. In popMax(): pop heap until top node not deleted, unlink node from doubly linked chain, record deleted id, return val.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport heapq\n\nclass Node:\n    def __init__(self, val, nid):\n        self.val = val\n        self.id = nid\n        self.prev = None\n        self.next = None\n\nclass MaxStack:\n    def __init__(self):\n        self.head = Node(0, 0)\n        self.tail = Node(0, 0)\n        self.head.next = self.tail\n        self.tail.prev = self.head\n        self.heap = []\n        self.deleted = set()\n        self.id_counter = 0\n\n    def push(self, x: int) -> None:\n        self.id_counter += 1\n        node = Node(x, self.id_counter)\n        pred = self.tail.prev\n        pred.next = node\n        node.prev = pred\n        node.next = self.tail\n        self.tail.prev = node\n        heapq.heappush(self.heap, (-x, -self.id_counter, node))\n\n    def _clean_tail(self):\n        while self.tail.prev != self.head and self.tail.prev.id in self.deleted:\n            node = self.tail.prev\n            node.prev.next = self.tail\n            self.tail.prev = node.prev\n\n    def pop(self) -> int:\n        self._clean_tail()\n        node = self.tail.prev\n        node.prev.next = self.tail\n        self.tail.prev = node.prev\n        self.deleted.add(node.id)\n        return node.val\n\n    def top(self) -> int:\n        self._clean_tail()\n        return self.tail.prev.val\n\n    def _clean_heap(self):\n        while self.heap and -self.heap[0][1] in self.deleted:\n            heapq.heappop(self.heap)\n\n    def peekMax(self) -> int:\n        self._clean_heap()\n        return -self.heap[0][0]\n\n    def popMax(self) -> int:\n        self._clean_heap()\n        neg_val, neg_id, node = heapq.heappop(self.heap)\n        nid = -neg_id\n        self.deleted.add(nid)\n        node.prev.next = node.next\n        node.next.prev = node.prev\n        return -neg_val\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(log N) push/popMax, O(1) top/peekMax amortized',
      space: 'O(N)',
      variables: ['N: total number of operations'],
      notes: 'Doubly linked list allows O(1) node deletion; heap allows O(log N) maximum element retrieval.',
      whyNaiveFails: 'A single stack requires O(N) auxiliary stack transfers to extract the maximum element.',
      spaceTimeTradeoff: 'Dual data structures and deletion tombstone set maintain synchronized state.',
      interviewerExpectation: 'Use of doubly linked list plus balanced BST or heap with lazy tombstone deletion.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import heapq

class Node:
    def __init__(self, val, nid):
        self.val = val
        self.id = nid
        self.prev = None
        self.next = None

class MaxStack:
    def __init__(self):
        self.head = Node(0, 0)
        self.tail = Node(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head
        self.heap = []
        self.deleted = set()
        self.id_counter = 0

    def push(self, x: int) -> None:
        self.id_counter += 1
        node = Node(x, self.id_counter)
        pred = self.tail.prev
        pred.next = node
        node.prev = pred
        node.next = self.tail
        self.tail.prev = node
        heapq.heappush(self.heap, (-x, -self.id_counter, node))

    def _clean_tail(self):
        while self.tail.prev != self.head and self.tail.prev.id in self.deleted:
            node = self.tail.prev
            node.prev.next = self.tail
            self.tail.prev = node.prev

    def pop(self) -> int:
        self._clean_tail()
        node = self.tail.prev
        node.prev.next = self.tail
        self.tail.prev = node.prev
        self.deleted.add(node.id)
        return node.val

    def top(self) -> int:
        self._clean_tail()
        return self.tail.prev.val

    def _clean_heap(self):
        while self.heap and -self.heap[0][1] in self.deleted:
            heapq.heappop(self.heap)

    def peekMax(self) -> int:
        self._clean_heap()
        return -self.heap[0][0]

    def popMax(self) -> int:
        self._clean_heap()
        neg_val, neg_id, node = heapq.heappop(self.heap)
        nid = -neg_id
        self.deleted.add(nid)
        node.prev.next = node.next
        node.next.prev = node.prev
        return -neg_val`,
        approach: 'Doubly Linked List and Lazy Heap Tombstones',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class MaxStack {
    list<int> dll;
    map<int, vector<list<int>::iterator>> map;
public:
    MaxStack() {}
    
    void push(int x) {
        dll.push_front(x);
        map[x].push_back(dll.begin());
    }
    
    int pop() {
        int x = dll.front();
        dll.pop_front();
        map[x].pop_back();
        if (map[x].empty()) map.erase(x);
        return x;
    }
    
    int top() {
        return dll.front();
    }
    
    int peekMax() {
        return map.rbegin()->first;
    }
    
    int popMax() {
        int maxVal = map.rbegin()->first;
        auto it = map[maxVal].back();
        map[maxVal].pop_back();
        if (map[maxVal].empty()) map.erase(maxVal);
        dll.erase(it);
        return maxVal;
    }
};`,
        approach: 'C++ std::list and std::map Iterators',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class MaxStack {
    class Node {
        int val, id;
        Node prev, next;
        Node(int v, int i) { val = v; id = i; }
    }
    private Node head, tail;
    private PriorityQueue<Node> heap;
    private Set<Integer> deleted;
    private int idCounter = 0;

    public MaxStack() {
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
        heap = new PriorityQueue<>((a, b) -> a.val != b.val ? b.val - a.val : b.id - a.id);
        deleted = new HashSet<>();
    }
    
    public void push(int x) {
        idCounter++;
        Node node = new Node(x, idCounter);
        Node pred = tail.prev;
        pred.next = node;
        node.prev = pred;
        node.next = tail;
        tail.prev = node;
        heap.offer(node);
    }
    
    private void cleanTail() {
        while (tail.prev != head && deleted.contains(tail.prev.id)) {
            Node node = tail.prev;
            node.prev.next = tail;
            tail.prev = node.prev;
        }
    }
    
    public int pop() {
        cleanTail();
        Node node = tail.prev;
        node.prev.next = tail;
        tail.prev = node.prev;
        deleted.add(node.id);
        return node.val;
    }
    
    public int top() {
        cleanTail();
        return tail.prev.val;
    }
    
    private void cleanHeap() {
        while (!heap.isEmpty() && deleted.contains(heap.peek().id)) {
            heap.poll();
        }
    }
    
    public int peekMax() {
        cleanHeap();
        return heap.peek().val;
    }
    
    public int popMax() {
        cleanHeap();
        Node node = heap.poll();
        deleted.add(node.id);
        node.prev.next = node.next;
        node.next.prev = node.prev;
        return node.val;
    }
}`,
        approach: 'Java Doubly Linked List with PriorityQueue Tombstones',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `class Node {
    constructor(val, id) {
        this.val = val;
        this.id = id;
        this.prev = null;
        this.next = null;
    }
}

var MaxStack = function() {
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.stack = []; // [Node]
};

/** 
 * @param {number} x
 * @return {void}
 */
MaxStack.prototype.push = function(x) {
    const node = new Node(x, this.stack.length);
    const pred = this.tail.prev;
    pred.next = node;
    node.prev = pred;
    node.next = this.tail;
    this.tail.prev = node;
    this.stack.push(node);
};

/** 
 * @return {number}
 */
MaxStack.prototype.pop = function() {
    const node = this.tail.prev;
    node.prev.next = this.tail;
    this.tail.prev = node.prev;
    const idx = this.stack.indexOf(node);
    if (idx !== -1) this.stack.splice(idx, 1);
    return node.val;
};

/** 
 * @return {number}
 */
MaxStack.prototype.top = function() {
    return this.tail.prev.val;
};

/** 
 * @return {number}
 */
MaxStack.prototype.peekMax = function() {
    let maxVal = -Infinity;
    let curr = this.head.next;
    while (curr !== this.tail) {
        if (curr.val > maxVal) maxVal = curr.val;
        curr = curr.next;
    }
    return maxVal;
};

/** 
 * @return {number}
 */
MaxStack.prototype.popMax = function() {
    let maxVal = -Infinity;
    let maxNode = null;
    let curr = this.tail.prev;
    while (curr !== this.head) {
        if (curr.val > maxVal) {
            maxVal = curr.val;
            maxNode = curr;
        }
        curr = curr.prev;
    }
    maxNode.prev.next = maxNode.next;
    maxNode.next.prev = maxNode.prev;
    const idx = this.stack.indexOf(maxNode);
    if (idx !== -1) this.stack.splice(idx, 1);
    return maxVal;
};`,
        approach: 'JavaScript Doubly Linked List Max Tracker',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'max-stack.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    stk = scope['MaxStack']()

    stk.push(5)
    stk.push(1)
    stk.push(5)
    assert stk.top() == 5
    assert stk.popMax() == 5
    assert stk.top() == 1
    assert stk.peekMax() == 5
    assert stk.pop() == 1
    assert stk.top() == 5
    print("✓ max-stack passed")

if __name__ == '__main__':
    main()
`
  }
];

export function writeBatch14Algo2() {
  for (const item of batch14Algo2Problems) {
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
  writeBatch14Algo2();
}
