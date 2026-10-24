from collections import deque

class Solution:
    def kSimilarity(self, s1: str, s2: str) -> int:
        if s1 == s2:
            return 0
        q = deque([(s1, 0)])
        visited = {s1}
        n = len(s1)
        while q:
            curr, step = q.popleft()
            i = 0
            while i < n and curr[i] == s2[i]:
                i += 1
            for j in range(i + 1, n):
                if curr[j] == s2[i] and curr[j] != s2[j]:
                    nxt_arr = list(curr)
                    nxt_arr[i], nxt_arr[j] = nxt_arr[j], nxt_arr[i]
                    nxt = "".join(nxt_arr)
                    if nxt == s2:
                        return step + 1
                    if nxt not in visited:
                        visited.add(nxt)
                        q.append((nxt, step + 1))
                    if curr[i] == s2[j]:
                        break
        return -1

def test():
    sol = Solution()
    assert sol.kSimilarity("ab", "ba") == 1, "test 1 failed"
    assert sol.kSimilarity("abc", "bca") == 2, "test 2 failed"
    assert sol.kSimilarity("abac", "baca") == 2, "test 3 failed"
    print("✓ k-similar-strings passed")

if __name__ == "__main__":
    test()
