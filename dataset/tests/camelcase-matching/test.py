from typing import List

class Solution:
    def camelMatch(self, queries: List[str], pattern: str) -> List[bool]:
        def matches(query: str) -> bool:
            p = 0
            for ch in query:
                if p < len(pattern) and ch == pattern[p]:
                    p += 1
                elif ch.isupper():
                    return False
            return p == len(pattern)

        return [matches(q) for q in queries]

def test():
    sol = Solution()
    q = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"]
    assert sol.camelMatch(q, "FB") == [True,False,True,True,False], "test 1 failed"
    print("✓ camelcase-matching passed")

if __name__ == "__main__":
    test()
