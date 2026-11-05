class Solution:
    def kthCharacter(self, k: int) -> str:
        # String begins with 'a'. In each operation, append a copy where each character is incremented (a->b, b->c ... z->a)
        # Length doubles each step: 1, 2, 4, 8 ...
        # The number of shifts applied to character at index k-1 is the popcount of k-1!
        shifts = bin(k - 1).count('1')
        return chr(ord('a') + (shifts % 26))

def run_tests():
    sol = Solution()
    # Step 0: "a"
    # Step 1: "ab"
    # Step 2: "abbc"
    # Step 3: "abbcbccd"
    assert sol.kthCharacter(1) == 'a'
    assert sol.kthCharacter(2) == 'b'
    assert sol.kthCharacter(5) == 'b'
    assert sol.kthCharacter(8) == 'd'
    print("All tests passed for 3744.")

if __name__ == "__main__":
    run_tests()