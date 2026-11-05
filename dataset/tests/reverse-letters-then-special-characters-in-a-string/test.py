class Solution:
    def reverseLettersAndSpecial(self, s: str) -> str:
        res = list(s)
        letter_indices = [i for i, c in enumerate(s) if c.isalpha()]
        special_indices = [i for i, c in enumerate(s) if not c.isalpha()]
        
        l, r = 0, len(letter_indices) - 1
        while l < r:
            res[letter_indices[l]], res[letter_indices[r]] = res[letter_indices[r]], res[letter_indices[l]]
            l += 1
            r -= 1
        
        l, r = 0, len(special_indices) - 1
        while l < r:
            res[special_indices[l]], res[special_indices[r]] = res[special_indices[r]], res[special_indices[l]]
            l += 1
            r -= 1
        
        return "".join(res)

def run_tests():
    sol = Solution()
    # "a-b_c" -> letters 'a','b','c' -> 'c','b','a'. specials '-', '_' -> '_', '-'
    assert sol.reverseLettersAndSpecial("a-b_c") == "c_b-a"
    assert sol.reverseLettersAndSpecial("abc") == "cba"
    assert sol.reverseLettersAndSpecial("!@#") == "#@!"
    print("All tests passed for 3823.")

if __name__ == "__main__":
    run_tests()
