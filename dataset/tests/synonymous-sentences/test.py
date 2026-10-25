from collections import defaultdict

class Solution:
    def generateSentences(self, synonyms: list[list[str]], text: str) -> list[str]:
        parent = {}
        def find(x):
            if parent.setdefault(x, x) != x:
                parent[x] = find(parent[x])
            return parent[x]
            
        def union(x, y):
            rx, ry = find(x), find(y)
            if rx != ry:
                parent[rx] = ry
                
        for u, v in synonyms:
            union(u, v)
            
        groups = defaultdict(set)
        for w in parent:
            groups[find(w)].add(w)
            
        words = text.split()
        res = []
        
        def backtrack(idx, path):
            if idx == len(words):
                res.append(' '.join(path))
                return
            w = words[idx]
            root = find(w)
            candidates = sorted(groups[root]) if root in groups else [w]
            for cand in candidates:
                path.append(cand)
                backtrack(idx + 1, path)
                path.pop()
                
        backtrack(0, [])
        return res

def test():
    sol = Solution()
    syn = [["happy","joy"],["sad","sorrow"],["joy","cheerful"]]
    t = "I am happy today but was sad yesterday"
    res = sol.generateSentences(syn, t)
    assert len(res) == 6, f"expected 6 sentences, got {len(res)}"
    assert res[0] == "I am cheerful today but was sad yesterday", "test 1 first elem failed"
    print("✓ synonymous-sentences passed")

if __name__ == "__main__":
    test()
