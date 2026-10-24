import sys

class Solution:
    def wordPatternMatch(self, pattern: str, s: str) -> bool:
        p2w = {}
        w2p = {}
        def backtrack(p_idx: int, s_idx: int) -> bool:
            if p_idx == len(pattern) and s_idx == len(s):
                return True
            if p_idx == len(pattern) or s_idx == len(s):
                return False
            ch = pattern[p_idx]
            if ch in p2w:
                w = p2w[ch]
                if not s.startswith(w, s_idx):
                    return False
                return backtrack(p_idx + 1, s_idx + len(w))
            for k in range(s_idx + 1, len(s) + 1):
                sub = s[s_idx:k]
                if sub in w2p:
                    continue
                p2w[ch] = sub
                w2p[sub] = ch
                if backtrack(p_idx + 1, k):
                    return True
                del p2w[ch]
                del w2p[sub]
            return False
        return backtrack(0, 0)

def test():
    sol = Solution()
    assert sol.wordPatternMatch("abab", "redblueredblue") is True, "test 1 failed"
    assert sol.wordPatternMatch("aaaa", "asdasdasdasd") is True, "test 2 failed"
    assert sol.wordPatternMatch("aabb", "xyzabcxzyabc") is False, "test 3 failed"
    print("✓ word-pattern-ii passed")

if __name__ == "__main__":
    test()
