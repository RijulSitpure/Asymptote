import sys
from typing import List
from collections import defaultdict

class Solution:
    def findLadders(self, beginWord: str, endWord: str, wordList: List[str]) -> List[List[str]]:
        words = set(wordList)
        if endWord not in words:
            return []
        parents = defaultdict(list)
        layer = {beginWord}
        found = False

        while layer and not found:
            words -= layer
            next_layer = set()
            for word in layer:
                for i in range(len(word)):
                    for c in "abcdefghijklmnopqrstuvwxyz":
                        cand = word[:i] + c + word[i + 1:]
                        if cand in words:
                            if cand == endWord:
                                found = True
                            next_layer.add(cand)
                            parents[cand].append(word)
            layer = next_layer

        if not found:
            return []

        res = []
        def build_paths(curr: str, path: List[str]):
            if curr == beginWord:
                res.append(path[::-1])
                return
            for p in parents[curr]:
                path.append(p)
                build_paths(p, path)
                path.pop()

        build_paths(endWord, [endWord])
        return res

def test():
    sol = Solution()
    wl1 = ["hot","dot","dog","lot","log","cog"]
    r1 = sol.findLadders("hit", "cog", wl1)
    expected1 = [
        ["hit","hot","dot","dog","cog"],
        ["hit","hot","lot","log","cog"]
    ]
    assert sorted(r1) == sorted(expected1), "test 1 failed"
    r2 = sol.findLadders("hit", "cog", ["hot","dot","dog","lot","log"])
    assert r2 == [], "test 2 failed"
    print("✓ word-ladder-ii passed")

if __name__ == "__main__":
    test()
