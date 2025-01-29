<template>
  <div class="w-[700px]">
    <div class="mb-4">
      <input
        type="text"
        :value="selectedDateRange"
        readonly
        class="w-[260px] bg-[#FCFCFC] border-solid border-[#E8E8E8] px-4 py-3 border rounded-lg font-medium text-sm text-[#171717] cursor-pointer focus:outline-none"
        placeholder="Select date"
      />
    </div>

    <div class="bg-[#FCFCFC] rounded-lg shadow p-6">
      <div class="flex justify-between">
        <div>
          <div class="flex items-center gap-20 mb-[24px]">
            <button
              class="hover:bg-gray-50 rounded-full"
              @click="navigateMonths(-1)"
            >
              <i class="fa-solid fa-chevron-left w-4 h-4 text-[#6F6F6F]"></i>
            </button>
            <div class="text-sm text-center font-semibold text-[16px]">
              <span>{{ formatMonth(currentDisplayMonth) }}</span>
              <span class="mx-2 text-[#6f6f6f]">-</span>
              <span class="text-[#6F6F6F]">{{
                formatYear(currentDisplayMonth)
              }}</span>
            </div>
          </div>
          <CalendarMonth
            :month="currentDisplayMonth"
            :selectedStartDate="selectedStartDate"
            :selectedEndDate="selectedEndDate"
            :currentDate="currentDate"
            @select-date="handleDateSelect"
          />
        </div>
        <div>
          <div class="flex items-center justify-end gap-20 mb-[24px]">
            <div class="text-sm text-center font-semibold text-[16px]">
              <span>{{ formatMonth(nextDisplayMonth) }}</span>
              <span class="mx-2 text-[#6f6f6f]">-</span>
              <span class="text-[#6F6F6F]">{{
                formatYear(nextDisplayMonth)
              }}</span>
            </div>
            <button
              class="hover:bg-gray-50 rounded-full"
              @click="navigateMonths(1)"
            >
              <i class="fa-solid fa-chevron-right w-4 h-4 text-[#6F6F6F]"></i>
            </button>
          </div>
          <CalendarMonth
            :month="nextDisplayMonth"
            :selectedStartDate="selectedStartDate"
            :selectedEndDate="selectedEndDate"
            :currentDate="currentDate"
            @select-date="handleDateSelect"
          />
        </div>
      </div>
      <div
        class="flex items-center justify-start gap-4 mt-[24px] border-gray-100"
      >
        <button
          v-for="option in quickSelectOptions"
          :key="option.days"
          @click="selectDateRange(option.days)"
          :class="{
            'bg-black text-white': selectedQuickOption === option.days,
            'bg-[#fcfcfc] text-[#858585] border border-solid shadow-sm border-[#E8E8E8]':
              selectedQuickOption !== option.days,
          }"
          class="text-sm font-medium h-[41px] w-[96px] rounded-lg"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const currentDate = ref(new Date());

const displayDate = ref(new Date());

const selectedStartDate = ref(null);
const selectedEndDate = ref(null);
const selectedQuickOption = ref(null);

const currentDisplayMonth = computed(() => {
  return new Date(
    displayDate.value.getFullYear(),
    displayDate.value.getMonth(),
    1
  );
});

const nextDisplayMonth = computed(() => {
  return new Date(
    displayDate.value.getFullYear(),
    displayDate.value.getMonth() + 1,
    1
  );
});

const quickSelectOptions = [
  { label: "7 days", days: 7 },
  { label: "15 days", days: 15 },
  { label: "30 days", days: 30 },
  { label: "1 month", days: 30 },
  { label: "3 months", days: 90 },
];

const formatMonth = (date) => {
  return date.toLocaleString("default", { month: "long" });
};

const formatYear = (date) => {
  return date.getFullYear();
};

const formatDate = (date) => {
  return date.toLocaleDateString("en-GB");
};

const selectedDateRange = computed(() => {
  if (!selectedStartDate.value) return "";
  if (!selectedEndDate.value) return formatDate(selectedStartDate.value);
  return `${formatDate(selectedStartDate.value)} - ${formatDate(
    selectedEndDate.value
  )}`;
});

const navigateMonths = (direction) => {
  const newDate = new Date(displayDate.value);
  newDate.setMonth(newDate.getMonth() + direction);
  displayDate.value = newDate;
};

const handleDateSelect = (date) => {
  if (!selectedStartDate.value || selectedEndDate.value) {
    selectedStartDate.value = date;
    selectedEndDate.value = null;
  } else {
    if (date < selectedStartDate.value) {
      selectedStartDate.value = date;
      selectedEndDate.value = null;
    } else {
      selectedEndDate.value = date;
    }
  }
};

const selectDateRange = (days) => {
  selectedQuickOption.value = days;
  selectedStartDate.value = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + days);
  selectedEndDate.value = endDate;
};
</script>
