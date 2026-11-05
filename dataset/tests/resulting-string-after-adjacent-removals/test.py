class Solution:
    def resultingString(self, s: str) -> str:
        st = []
        for c in s:
            if st and (abs(ord(st[-1]) - ord(c)) in (1, 25)):
                st.pop()
            else:
                st.append(c)
        return "".join(st)

def run_tests():
    s = Solution()
    res = s.resultingString("abczba")
    assert res == "cz", f"Expected 'cz', got '{res}'"
    print("3561 resulting-string-after-adjacent-removals PASSED")

if __name__ == "__main__":
    run_tests()
