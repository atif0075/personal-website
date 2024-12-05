<template>
  <div class="container mx-auto p-4 text-white">
    <h1 class="text-2xl font-bold mb-6">Projects List</h1>

    <!-- Status message with fade -->
    <Transition name="fade">
      <div
        v-if="statusMessage"
        class="mb-4 p-4 rounded-lg transition-all duration-300 shadow-lg"
        :class="
          isError
            ? 'bg-red-500/20 border border-red-500/20'
            : 'bg-green-500/20 border border-green-500/20'
        "
      >
        {{ statusMessage }}
      </div>
    </Transition>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(project, index) in projects"
        :key="project.name + index"
        class="border border-gray-700 rounded-lg p-6 shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:shadow-xl bg-gray-900/50 group"
        draggable="true"
        @dragstart="startDrag($event, index)"
        @dragend="endDrag"
        @dragover="dragOver($event, index)"
        @dragenter.prevent
        @dragleave="dragLeave($event)"
        @drop="onDrop($event, index)"
        :class="{
          'opacity-50 scale-95': draggedIndex === index,
          'ring-2 ring-blue-500 ring-opacity-50': isDraggingOver === index,
          'translate-y-0': true,
        }"
      >
        <div class="flex justify-between items-start mb-4 relative">
          <h2 class="text-xl font-semibold flex items-center gap-3 group">
            <span
              class="text-gray-400 transition-all duration-300 group-hover:text-blue-400 cursor-move opacity-50 group-hover:opacity-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M7 2a2 2 0 1 0 0 4h6a2 2 0 1 0 0-4H7zM3 8a2 2 0 1 0 0 4h14a2 2 0 1 0 0-4H3zm0 6a2 2 0 1 0 0 4h14a2 2 0 1 0 0-4H3z"
                />
              </svg>
            </span>
            {{ project.name }}
          </h2>
        </div>
        <p class="text-gray-400 mb-4 line-clamp-2">{{ project.description }}</p>
        <a
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm group"
        >
          Visit Project
          <span
            class="transform transition-transform duration-300 group-hover:translate-x-1"
            >→</span
          >
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Project {
  name: string;
  description: string;
  url: string;
  image?: string;
  order: number;
}

const projects = ref<Project[]>([]);
const draggedIndex = ref<number | null>(null);
const isDraggingOver = ref<number | null>(null);
const statusMessage = ref("");
const isError = ref(false);

// Initialize projects
const fetchProjects = async () => {
  try {
    const response = await $fetch("/api/projects");
    if (response.projects) {
      projects.value = response.projects;
    }
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    showStatus("Failed to load projects", true);
  }
};

// Initial fetch
await fetchProjects();

const showStatus = (message: string, error = false) => {
  statusMessage.value = message;
  isError.value = error;
  setTimeout(() => {
    statusMessage.value = "";
  }, 3000);
};

const startDrag = (event: DragEvent, index: number) => {
  if (event.dataTransfer) {
    draggedIndex.value = index;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("text/plain", index.toString());

    // Add drag ghost effect
    const dragGhost = document.createElement("div");
    dragGhost.classList.add("drag-ghost");
    dragGhost.textContent = projects.value[index].name;
    document.body.appendChild(dragGhost);
    event.dataTransfer.setDragImage(dragGhost, 0, 0);
    setTimeout(() => document.body.removeChild(dragGhost), 0);
  }
};

const endDrag = () => {
  draggedIndex.value = null;
  isDraggingOver.value = null;
};

const dragOver = (event: DragEvent, index: number) => {
  event.preventDefault();
  isDraggingOver.value = index;
};

const dragLeave = (event: DragEvent) => {
  const target = event.target as HTMLElement;
  if (!target.contains(event.relatedTarget as Node)) {
    isDraggingOver.value = null;
  }
};

const onDrop = async (event: DragEvent, dropIndex: number) => {
  event.preventDefault();
  const dragIndex = draggedIndex.value;

  if (dragIndex === null || dragIndex === dropIndex) {
    endDrag();
    return;
  }

  try {
    // Create new array with reordered items
    const newList = [...projects.value];
    const [movedItem] = newList.splice(dragIndex, 1);
    newList.splice(dropIndex, 0, movedItem);

    // Update order numbers in the new list
    const reorderedList = newList.map((project, index) => ({
      ...project,
      order: index,
    }));

    // Update local state immediately with the reordered list
    projects.value = reorderedList;

    const response = await $fetch("/api/projects/reorder", {
      method: "POST",
      body: { projects: reorderedList },
    });

    if (response.success) {
      showStatus("Order saved successfully");
      // No need to fetch again since we've already updated locally
      // await fetchProjects();  <-- Remove this line
    } else {
      throw new Error(response.error || "Failed to save order");
    }
  } catch (error) {
    console.error("Failed to save new order:", error);
    showStatus("Failed to save new order. Please try again.", true);
    // If error occurs, then fetch the original order
    await fetchProjects();
  } finally {
    endDrag();
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.drag-ghost {
  @apply fixed -left-full top-0 bg-gray-800 text-white px-4 py-2 rounded-lg 
         shadow-xl pointer-events-none z-50 opacity-90;
}

/* Smooth transitions for drag feedback */
.translate-y-0 {
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

[draggable="true"] {
  cursor: move;
  touch-action: none;
  user-select: none;
}

[draggable="true"]:hover {
  transform: translateY(-2px);
}

[draggable="true"]:active {
  cursor: grabbing;
  transform: translateY(0) scale(0.98);
}

/* Add smooth transition for drag over state */
.ring-2 {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Add a hover effect for the project cards */
.group:hover {
  background-color: rgba(31, 41, 55, 0.7);
}
</style>
