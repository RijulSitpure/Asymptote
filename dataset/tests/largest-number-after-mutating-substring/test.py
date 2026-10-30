class Solution:
    def maximumNumber(self, num: str, change: list[int]) -> str:
        digits = list(num)
        mutated = False
        
        for i, ch in enumerate(digits):
            d = int(ch)
            if change[d] > d:
                digits[i] = str(change[d])
                mutated = True
            elif change[d] == d and mutated:
                continue
            elif mutated:
                break
                
        return "".join(digits)

def test_max_number():
    sol = Solution()
    assert sol.maximumNumber("132", [9,8,5,0,3,6,4,2,6,8]) == "832"
    assert sol.maximumNumber("021", [9,4,3,5,7,2,1,9,0,6]) == "934"
    assert sol.maximumNumber("5", [1,4,7,5,3,2,5,6,9,4]) == "5"

