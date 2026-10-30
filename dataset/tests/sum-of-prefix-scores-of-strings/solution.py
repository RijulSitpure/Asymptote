class Solution:
    def sumPrefixScores(self, words: list[str]) -> list[int]:
        trie = {}
        for word in words:
            node = trie
            for ch in word:
                if ch not in node:
                    node[ch] = {"cnt": 0}
                node = node[ch]
                node["cnt"] += 1
        
        res = []
        for word in words:
            score = 0
            node = trie
            for ch in word:
                node = node[ch]
                score += node["cnt"]
            res.append(score)
        return res
