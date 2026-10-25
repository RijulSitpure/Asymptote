#include <cassert>
#include <vector>
#include "solution.cpp"

int main() {
    Solution sol;
    std::vector<std::vector<int>> c1 = {{15, 96}, {36, 2}};
    assert(sol.connectTwoGroups(c1) == 17);
    std::vector<std::vector<int>> c2 = {{1, 3, 5}, {4, 1, 1}, {1, 5, 3}};
    assert(sol.connectTwoGroups(c2) == 4);
    std::vector<std::vector<int>> c3 = {{2, 5, 1}, {3, 4, 7}, {8, 1, 2}, {6, 2, 4}, {3, 8, 8}};
    assert(sol.connectTwoGroups(c3) == 10);
    return 0;
}