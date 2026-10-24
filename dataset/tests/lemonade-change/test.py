from typing import List

class Solution:
    def lemonadeChange(self, bills: List[int]) -> bool:
        five = ten = 0
        for b in bills:
            if b == 5:
                five += 1
            elif b == 10:
                if five == 0:
                    return False
                five -= 1
                ten += 1
            else:
                if ten > 0 and five > 0:
                    ten -= 1
                    five -= 1
                elif five >= 3:
                    five -= 3
                else:
                    return False
        return True

def test():
    sol = Solution()
    assert sol.lemonadeChange([5, 5, 5, 10, 20]) is True, "test 1 failed"
    assert sol.lemonadeChange([5, 5, 10, 10, 20]) is False, "test 2 failed"
    print("✓ lemonade-change passed")

if __name__ == "__main__":
    test()
