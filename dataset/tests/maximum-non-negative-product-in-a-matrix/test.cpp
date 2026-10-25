#include <cassert>
#include <vector>
#include "solution.cpp"

int main() {
    Solution sol;
    std::vector<std::vector<int>> g1 = {{-1,-2,-3},{-2,-3,-3},{-3,-3,-2}};
    assert(sol.maxProductPath(g1) == -1);
    std::vector<std::vector<int>> g2 = {{1,-2,1},{1,-2,1},{3,-4,1}};
    assert(sol.maxProductPath(g2) == 8);
    std::vector<std::vector<int>> g3 = {{1, 3}, {0, -4}};
    assert(sol.maxProductPath(g3) == 0);
    return 0;
}