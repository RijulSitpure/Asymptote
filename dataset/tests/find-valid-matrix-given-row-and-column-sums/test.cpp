#include <cassert>
#include <vector>
#include <numeric>
#include "solution.cpp"

int main() {
    Solution sol;
    std::vector<int> r1 = {3, 8}, c1 = {4, 7};
    auto res1 = sol.restoreMatrix(r1, c1);
    assert(res1[0][0] + res1[0][1] == 3);
    assert(res1[1][0] + res1[1][1] == 8);
    assert(res1[0][0] + res1[1][0] == 4);
    assert(res1[0][1] + res1[1][1] == 7);
    return 0;
}