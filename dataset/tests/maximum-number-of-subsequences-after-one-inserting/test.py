class Solution:
    def maximumSubsequenceCount(self, text: str, pattern: str) -> int:
        p0, p1 = pattern[0], pattern[1]
        c0, c1 = 0, 0
        base_count = 0
        
        for ch in text:
            if ch == p1:
                base_count += c0
                c1 += 1
            if ch == p0:
                c0 += 1
                
        # Inserting p0 at beginning adds c1 matches
        # Inserting p1 at end adds c0 matches
        return base_count + max(c0, c1)

def run_tests():
    s = Solution()
    res1 = s.maximumSubsequenceCount("abdcdbc", "ac") # insert 'a' at start -> 4
    assert res1 == 4, f"Expected 4, got {res1}"
    res2 = s.maximumSubsequenceCount("aabb", "ab") # 4 base + max(2,2)=2 -> 6
    assert res2 == 6, f"Expected 6, got {res2}"
    print("3628 maximum-number-of-subsequences-after-one-inserting PASSED")

if __name__ == "__main__":
    run_tests()
