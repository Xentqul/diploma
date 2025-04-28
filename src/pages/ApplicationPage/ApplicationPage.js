import styles from "./ApplicationPage.module.css";
import applicationPic from "@/assets/application-pic/applicationForm.webp";
import BackButton from "@/shared/ui/BackButton/BackButton";
import FormBlock from "@/shared/components/FormBlock/FormBlock";

function ApplicationPage() {
  return (
    <div className={styles.wrapper}>
      {/* Левая часть: картинка */}
      <img src={applicationPic} alt="Подать заявку" className={styles.sidePic} />

      {/* Правая часть: контент */}
      <div className={styles.rightSide}>
        {/* Верхняя часть: кнопка на главную и логотип */}
        <div className={styles.topSection}>
          <BackButton>на главную</BackButton>
          <span className={styles.logo}>DRESSERY</span>
        </div>

        {/* Форма подачи заявки */}
        <FormBlock
          title="ПОДАТЬ ЗАЯВКУ"
          inputs={[
            {
              label: "ФИО",
              placeholder: "Иван Иванов Иванович",
              type: "text",
              name: "fullName",
            },
            {
              label: "эл. почта",
              placeholder: "example@gmail.com",
              type: "email",
              name: "email",
            },
            {
              label: "номер телефона",
              placeholder: "+7-(___)-___-__-__",
              type: "tel",
              name: "phone",
            },
            {
              label: "уровень образования",
              type: "select", // Тип для выпадающего списка
              name: "educationLevel",
              options: [
                { value: "college", label: "Колледж" },
                { value: "bachelor", label: "Бакалавриат" },
                { value: "master", label: "Магистратура" },
                { value: "graduate", label: "Аспирантура" },
                { value: "phd", label: "Кандидат наук" },
              ],
            },
            {
              label: "ссылка на портфолио",
              placeholder: "https://example.com/portfolio",
              type: "url",
              name: "portfolioLink",
            },
          ]}
          buttonLabel="отправить"
        />
      </div>
    </div>
  );
}

export default ApplicationPage;