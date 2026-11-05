class Solution:
    def shortestSuperstring(self, s1: str, s2: str) -> str:
        if s1 in s2:
            return s2
        if s2 in s1:
            return s1
            
        def max_overlap(a: str, b: str) -> int:
            max_len = min(len(a), len(b))
            for k in range(max_len, 0, -1):
                if a[-k:] == b[:k]:
                    return k
            return 0

        o1 = max_overlap(s1, s2)
        c1 = s1 + s2[o1:]
        
        o2 = max_overlap(s2, s1)
        c2 = s2 + s1[o2:]
        
        if len(c1) < len(c2):
            return c1
        elif len(c2) < len(c1):
            return c2
        else:
            return min(c1, c2)

def run_tests():
    s = Solution()
    res1 = s.shortestSuperstring("alex", "loves")
    assert res1 == "alexloves", f"Expected alexloves, got {res1}"
    res2 = s.shortestSuperstring("catg", "atgcta")
    assert res2 == "catgcta", f"Expected catgcta, got {res2}"
    print("3571 find-the-shortest-superstring-ii PASSED")

if __name__ == "__main__":
    run_tests()
