from typing import List

class Solution:
    def findRestaurant(self, list1: List[str], list2: List[str]) -> List[str]:
        idx_map = {val: i for i, val in enumerate(list1)}
        min_sum = float('inf')
        res = []
        for j, val in enumerate(list2):
            if val in idx_map:
                curr_sum = idx_map[val] + j
                if curr_sum < min_sum:
                    min_sum = curr_sum
                    res = [val]
                elif curr_sum == min_sum:
                    res.append(val)
        return res

def run_tests():
    sol = Solution()
    res1 = sol.findRestaurant(["Shogun","Tapioca Express","Burger King","KFC"], ["Piatti","The Grill at Torrey Pines","Hungry Hunter Steakhouse","Shogun"])
    assert res1 == ["Shogun"]
    res2 = sol.findRestaurant(["happy","sad","good"], ["sad","happy","good"])
    assert sorted(res2) == ["happy", "sad"]
    print("All tests passed for 3682.")

if __name__ == "__main__":
    run_tests()
