import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "2.6.2"
	id("io.spring.dependency-management") version "1.0.11.RELEASE"
	kotlin("jvm") version "1.6.10"
	kotlin("plugin.spring") version "1.6.10"
	id("org.openapi.generator") version "5.3.0"
}

group = "com.techforlife"
version = "0.0.1-SNAPSHOT"

java {
	sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib")
	implementation("javax.validation:validation-api:2.0.1.Final")
	implementation("org.springdoc:springdoc-openapi-data-rest:1.6.3")
	implementation("org.springdoc:springdoc-openapi-ui:1.6.3")
	implementation("org.springdoc:springdoc-openapi-kotlin:1.6.3")
	implementation("io.swagger.core.v3:swagger-annotations:2.2.15")
	implementation("fr.velossity.osgi:ProducerAP:1.0.14")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("com.squareup.moshi:moshi-kotlin:1.13.0")
	testImplementation("com.squareup.moshi:moshi-adapters:1.13.0")
	testImplementation("com.squareup.okhttp3:okhttp:4.9.3")
	// https://mvnrepository.com/artifact/io.swagger.core.v3/swagger-annotations
}

val oasPackage = "com.techforlife.producer"
val oasSpecLocation = "src/main/resources/openapi.yaml"
val oasGenOutputDir = project.layout.buildDirectory.dir("generated-oas")

tasks.register("generateServer", org.openapitools.generator.gradle.plugin.tasks.GenerateTask::class) {
	input = project.file(oasSpecLocation).path
	outputDir.set(oasGenOutputDir.get().toString())
	modelPackage.set("$oasPackage.model")
	apiPackage.set("$oasPackage.api")
	packageName.set(oasPackage)
	generatorName.set("kotlin-spring")
	configOptions.set(
		mapOf(
			"dateLibrary" to "java8",
			"interfaceOnly" to "true",
			"useTags" to "true"
		)
	)
}

sourceSets {
	val main by getting
	main.java.srcDir("${oasGenOutputDir.get()}/src/main/kotlin")
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs += "-Xjsr305=strict"
		jvmTarget = "17"
	}
	dependsOn("generateServer")
}

tasks.withType<Test> {
	useJUnitPlatform()
}
