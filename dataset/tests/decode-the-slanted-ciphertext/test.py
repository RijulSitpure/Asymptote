from solution import Solution

def run_tests():
    s = Solution()
    assert s.decodeCiphertext("ch   ie   pr", 3) == "cipher"
    assert s.decodeCiphertext("iveo    eed   l te   olc", 4) == "i love leetcode"
    assert s.decodeCiphertext("coding", 1) == "coding"
    print("All tests passed for decode-the-slanted-ciphertext!")

if __name__ == "__main__":
    run_tests()
