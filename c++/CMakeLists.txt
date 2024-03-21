cmake_minimum_required(VERSION 3.10)
project(C++_car_controller)

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
# Add all your source files
include_directories(include)
# Include Eigen
find_package(Eigen3 REQUIRED)
# Include ZMQ
find_package(cppzmq REQUIRED)

# Add executable
set(SOURCES src/main.cpp)

# Add an executable target
add_executable(run_me ${SOURCES})
target_link_libraries(run_me Eigen3::Eigen cppzmq)
# Remove warnings
target_compile_options(run_me PRIVATE -Wno-psabi)
