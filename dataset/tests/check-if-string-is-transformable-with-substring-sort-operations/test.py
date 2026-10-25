from collections import deque

class Solution:
    def isTransformable(self, s: str, t: str) -> bool:
        pos = [deque() for _ in range(10)]
        for i, ch in enumerate(s):
            pos[int(ch)].append(i)
        for ch in t:
            d = int(ch)
            if not pos[d]:
                return False
            idx = pos[d][0]
            for smaller in range(d):
                if pos[smaller] and pos[smaller][0] < idx:
                    return False
            pos[d].popleft()
        return True

def test():
    sol = Solution()
    assert sol.isTransformable("84532", "34852") == True, "test 1 failed"
    assert sol.isTransformable("34521", "23415") == True, "test 2 failed"
    assert sol.isTransformable("12345", "12435") == False, "test 3 failed"
    print("✓ check-if-string-is-transformable-with-substring-sort-operations passed")

if __name__ == "__main__":
    test()
