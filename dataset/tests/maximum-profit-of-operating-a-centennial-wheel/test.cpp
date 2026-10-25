#include <cassert>
#include <vector>
#include "solution.cpp"

int main() {
    Solution sol;
    std::vector<int> c1 = {8, 3};
    assert(sol.minOperationsMaxProfit(c1, 5, 6) == 3);
    std::vector<int> c2 = {10, 9, 6};
    assert(sol.minOperationsMaxProfit(c2, 6, 4) == 7);
    std::vector<int> c3 = {3, 4, 0, 5, 1};
    assert(sol.minOperationsMaxProfit(c3, 1, 92) == -1);
    return 0;
}