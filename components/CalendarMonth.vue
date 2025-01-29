<template>
  <div class="grid grid-cols-7 gap-y-0.5">
    <div
      v-for="day in weekDays"
      :key="day"
      class="w-10 h-10 flex items-center justify-center text-[#858585] text-sm font-semibold"
    >
      {{ day }}
    </div>

    <div v-for="(date, index) in monthDays" :key="index">
      <div
        class="w-10 h-10 flex items-center justify-center relative"
        :class="getDayClasses(date)"
        @click="date && $emit('select-date', date)"
      >
        <span>{{ date?.getDate() }}</span>
        <div
          v-if="isCurrentDate(date)"
          class="absolute bottom-1 w-1 h-1 bg-black rounded-full"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  month: Date,
  selectedStartDate: [Date, null],
  selectedEndDate: [Date, null],
  currentDate: Date,
});

defineEmits({
  "select-date": (date) => date instanceof Date,
});

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const monthDays = computed(() => {
  const days = [];
  const firstDay = new Date(
    props.month.getFullYear(),
    props.month.getMonth(),
    1
  );
  const lastDay = new Date(
    props.month.getFullYear(),
    props.month.getMonth() + 1,
    0
  );

  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push(null);
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(props.month.getFullYear(), props.month.getMonth(), i));
  }

  return days;
});

const hasSelectedRange = computed(() => {
  return props.selectedStartDate && props.selectedEndDate;
});

const isCurrentDate = (date) => {
  return date
    ? date.toDateString() === props.currentDate.toDateString()
    : false;
};

const isInRange = (date) => {
  if (!date || !props.selectedStartDate || !props.selectedEndDate) return false;
  return date > props.selectedStartDate && date < props.selectedEndDate;
};

const isStartDate = (date) => {
  return (
    date &&
    props.selectedStartDate &&
    date.toDateString() === props.selectedStartDate.toDateString()
  );
};

const isEndDate = (date) => {
  return (
    date &&
    props.selectedEndDate &&
    date.toDateString() === props.selectedEndDate.toDateString()
  );
};

const getDayClasses = (date) => {
  if (!date) return "invisible";

  return {
    "cursor-pointer text-sm hover:bg-[#f3f3f3] hover:text-[#171717] rounded-[10px]": true,
    "bg-[#171717] text-white rounded-l-[10px]":
      isStartDate(date) && !isEndDate(date),
    "bg-[#171717] text-white rounded-r-[10px]":
      isEndDate(date) && !isStartDate(date),
    "bg-[#171717] text-white rounded-[10px]":
      isStartDate(date) && isEndDate(date),
    "bg-[#f3f3f3] text-[#171717]": isInRange(date),
    "rounded-none": isInRange(date),
  };
};
</script>
